const express = require("express");
const chatbotRouter = express.Router();
const chatController = require("../controllers/chatBotController");

chatbotRouter.post("/chatbot/chat", chatController.getQuestion);
chatbotRouter.post("/chatbot/ticket", chatController.newTicket);

module.exports = { chatbotRouter };
