const bcrypt = require("bcrypt");
const users = [];

async function create(req, res, next) {
  const { username, password } = req.body.data;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    res.status(201).send();
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
}

async function authenticate(req, res, next) {
  const { username, password } = req.body.data;

  const foundUser = users.find((user) => user.username === username);

  if (!foundUser) {
    res.status(400).send("User not found");
  }

  try {
    if (await bcrypt.compare(password, foundUser.password)) {
      return res.status(200).send("Success");
    }
  } catch {
    res.status(400).send("Not authorized");
  }
}

module.exports = {
  create,
  authenticate,
};
