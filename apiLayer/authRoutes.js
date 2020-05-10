const express = require("express");
const db = require("../dataLayer");
const { isLoggedIn } = require("./apiRoutes");

const authRouter = express.Router();

module.exports = { authRouter };
