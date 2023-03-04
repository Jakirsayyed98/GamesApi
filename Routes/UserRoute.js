const express = require('express');
const { UserSignUp, UserSignIn, verifyOTP, verifiedUserList } = require('../controller/UserController');
const UserRoutes = express.Router();

UserRoutes.post("/signup",UserSignUp)
UserRoutes.post("/signin",UserSignIn)
UserRoutes.post("/verifyOTP",verifyOTP)
UserRoutes.post("/verifiedUserList",verifiedUserList)

module.exports = UserRoutes;