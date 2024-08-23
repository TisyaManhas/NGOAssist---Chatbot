const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const userController = {
  create: asyncHandler(async (req, res) => {
    const userID = Math.floor(Math.random() * 1e16).toString();

    const userCreated = await User.create({
      userId: userID,
    });


    res.json({
      userID: userCreated.userId,
    });
  }),
};

module.exports = userController;
