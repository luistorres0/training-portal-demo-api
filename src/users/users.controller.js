const bcrypt = require("bcrypt");
const service = require("./users.service");

async function create(req, res, next) {
  const { username, password } = req.body.data;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = { username, password: hashedPassword };
    const data = await service.create(newUser);
    res.status(201).send();
  } catch {
    res.status(500).json({ message: "Error: Failed to create user" });
  }
}

async function authenticate(req, res, next) {
  const { username, password } = req.body.data;

  const foundUser = await service.getUserByName(username);

  if (!foundUser) {
    res.status(400).json({ message: "Error: User not found" });
  }

  try {
    if (await bcrypt.compare(password, foundUser.password)) {
      return res.status(200).json({ message: "authenticated" });
    } else {
      return res.status(400).json({ message: "not authenticated" });
    }
  } catch {
    return res.status(500).json({ message: "Error: Something went wrong." });
  }
}

module.exports = {
  create,
  authenticate,
};
