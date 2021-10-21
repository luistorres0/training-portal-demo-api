exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.renameColumn("username", "email");
    table.unique("email");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.renameColumn("email", "username");
    table.dropUnique("email");
  });
};
