const asyncHandler = require("express-async-handler");
const { Chat } = require("../model/Chatbot");
const { generateChat } = require("./gemini");
const { Ticket } = require("../model/ticket");
// const encrypt = require("../helper/encrypt");
// const encrypt = require("../helper/encrypt");
const chatController = {
  getQuestion: asyncHandler(async (req, res) => {
    const { question, user } = req.body;
    console.log(req.body)

    if (!question) {
      throw new Error("Please all fields are required");
    }
    console.log(user);
    let Answer = "";
    try {
      Answer = await generateChat(user, question);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
        Answer: "error generating response",
        responseCreated: Answer,
      });
    }
    
    try {
      const doesUserExist = await Chat.findOne({ user: user });
      if (doesUserExist) {
        const chat = await Chat.findOne({ user: user });
        chat.chat.push({
          query: question,
          response: Answer,
        });

        chat.save();
      } else {
        const chatCreated = await Chat.create({
          user: user,
          chat: [
            {
              query: question,
              response: Answer,
            },
          ],
        });
        chatCreated.save();
      }
      res.json({
        response: Answer,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }),
  newTicket: asyncHandler(async (req, res) => {
    const { user, name, email } = req.body;
    if (!user || !name || !email) {
      throw new Error("Please all fields are required");
    }

    try {
      const chatRecords = await Chat.findOne({ user: user });
      const ticketCreated = await Ticket.create({
        user: user,
        name: name,
        email: (email),
        ticket: chatRecords.chat,
      });
      ticketCreated.save();

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "Team14",
            email: "divyam.7379@gmail.com",
          },
          to: [
            {
              email: email,
              name: name,
            },
          ],
          subject: "You're in waitlist!",
          htmlContent: `<h1>Thank you for reaching out to us, your ticket has been created successfully. We will get back to you soon.
          </h1>`,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      res.json({
        message: "Ticket created successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }),
};

module.exports = chatController;
