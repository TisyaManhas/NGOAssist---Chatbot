const express = require("express");
const chatbotRouter = express.Router();
const chatController = require("../controllers/chatBotController");

chatbotRouter.post("/chatbot/chat", chatController.getQuestion);

module.exports = chatbotRouter;
