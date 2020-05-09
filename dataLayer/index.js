const client = require("./client");

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = require("./modelsIndex");
const { users } = models;

const sync = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS users;

  CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    CHECK (char_length(username) > 0)
  );`;
  await client.query(sql);

  const _users = {
    lucy: {
      username: "lucy",
      firstName: "Lucille",
      lastName: "Pincher",
      password: "LUCY",
      role: "ADMIN",
    },
    moe: {
      username: "moe",
      firstName: "Moe",
      lastName: "Durvish",
      password: "MOE",
      role: "USER",
    },
    curly: {
      username: "larry",
      firstName: "Larrold",
      lastName: "Bohannaghan",
      password: "LARRY",
      role: "USER",
    },
  };

  const [lucy, moe] = await Promise.all(
    Object.values(_users).map((user) => users.create(user))
  );

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});

  return {
    users: userMap,
  };
};

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
};
