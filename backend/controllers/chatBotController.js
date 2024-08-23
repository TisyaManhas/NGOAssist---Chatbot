const asyncHandler = require("express-async-handler");
const Chat = require("../model/Chatbot");

const chatController = {
  getQuestion: asyncHandler(async (req, res) => {
    const { question, user } = req.body;

    if (!question) {
      throw new Error("Please all fields are required");
    }

    req.user
    const chatCreated = await Chat.create({
      user: req.user,
      chat: [
        {
          query: question,
          response: ,
        },
      ],
    });



    res.json({
      chatCreated,
    });
  }),

  
};

module.exports = chatController;
