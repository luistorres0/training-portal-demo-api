const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post("/users", async (req, res, next) => {
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
});

app.post("/users/login", async (req, res, next) => {
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
});

module.exports = app;
