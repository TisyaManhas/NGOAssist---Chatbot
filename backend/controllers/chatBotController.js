const asyncHandler = require("express-async-handler");
const { Chat } = require("../model/Chatbot");
const { generateChat } = require("./gemini");
const User = require("../model/User");

const chatController = {
  getQuestion: asyncHandler(async (req, res) => {
    const { question, user } = req.body;

    if (!question) {
      throw new Error("Please all fields are required");
    }
    console.log(user);
    let response = "";
    try {
      response = await generateChat(user, question);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
        response: "error generating response",
        responseCreated: response,
      });
    }
    res.json({
      response,
    });
    try {
      const doesUserExist = await User.findOne({ user: user });
      if (doesUserExist) {
        const chat = await Chat.findOne({ user: User._id });
        chat.chat.push({
          query: question,
          response: response,
        });
      } else {
        const chatCreated = await Chat.create({
          user: user,
          chat: [
            {
              query: question,
              response: response,
            },
          ],
        });
        chatCreated.save();
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }),

  askAgain: asyncHandler(),
};

module.exports = chatController;
