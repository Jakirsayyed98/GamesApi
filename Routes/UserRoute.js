const express = require('express');
const { UserSignUp, UserSignIn } = require('../controller/UserController');
const UserRoutes = express.Router();

UserRoutes.post("/signup",UserSignUp)
UserRoutes.post("/signin",UserSignIn)

module.exports = UserRoutes;