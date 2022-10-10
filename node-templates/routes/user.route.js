const express = require("express");
const { userSignup, userlogin } = require("../controllers/user.controller");

const userRouter = express.Router();
userRouter.route("/signup").post(userSignup);
userRouter.route("/signin").post(userlogin)
module.exports = userRouter;
