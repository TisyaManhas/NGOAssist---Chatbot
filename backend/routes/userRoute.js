const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/user/create", userController.create);

module.exports = userRouter;
