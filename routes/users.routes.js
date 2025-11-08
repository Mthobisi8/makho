const express = require("express");
const { getAll } = require("../controllers/users.controller");

const users = express.Router();

users.get("/get-all-users", getAll);

module.exports = { users };
