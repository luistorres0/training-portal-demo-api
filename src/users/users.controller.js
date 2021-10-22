const bcrypt = require("bcrypt");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./users.service");

async function create(req, res, next) {
  const { email, password } = req.body.data;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = { email, password: hashedPassword };
  await service.create(newUser);

  res.status(201).send();
}

async function authenticate(req, res, next) {
  const { email, password } = req.body.data;
  const foundUser = await service.getUserByName(email);

  if (!foundUser) {
    return next({ status: 404, message: "User not found" });
  }

  if (await bcrypt.compare(password, foundUser.password)) {
    return res.status(200).json({ message: "authenticated" });
  } else {
    return res.status(400).json({ message: "not authenticated" });
  }
}

module.exports = {
  create: [asyncErrorBoundary(create)],
  authenticate: [asyncErrorBoundary(authenticate)],
};
