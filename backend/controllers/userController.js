const asyncHandler = require("express-async-handler");
const {Chat} = require("../model/Chatbot");
const crypto = require("crypto");

const userController = {
  create: asyncHandler(async (req, res) => {
    const userID = crypto.randomBytes(10).toString("hex");
    try {
      const userCreated = await Chat.create({
        user: userID,
      });
    } catch (error) {
      console.log(error);
    }

    res.json({
      userID: userCreated.userId,
    });
  }),
};

module.exports = userController;
