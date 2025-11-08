const express = require("express");
const { register, login, isUser} = require("../controllers/auth.controller");

const auth = express.Router();

auth.post("/register", register)
auth.post("/login", login)
auth.post("/is-logged-in", isUser)

module.exports = { auth };
