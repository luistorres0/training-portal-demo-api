const knex = require("../db/connection");

function create(user) {
  return knex("users")
    .insert(user, "*")
    .then((users) => users[0]);
}

function getUserByName(username) {
  return knex("users").where({ username }, "*").first();
}

module.exports = {
  create,
  getUserByName
};
