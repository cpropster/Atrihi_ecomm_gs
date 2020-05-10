const express = require("express");
const db = require("../dataLayer");
const jwt = require("jwt-simple");
const models = db.models;
const { app, isLoggedIn, isAdmin } = require("../app");

const usersRouter = express.Router();

module.exports = { usersRouter };
