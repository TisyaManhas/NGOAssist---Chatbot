const asyncHandler = require("express-async-handler");
const { Chat } = require("../model/Chatbot");
const { generateChat } = require("./gemini");
const { Ticket } = require("../model/ticket");
const natural = require("natural");
const fetch = require("node-fetch");

// Priority Queue Implementation
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(ticket, priority) {
    this.queue.push({ ticket, priority });
    this.queue.sort((a, b) => b.priority - a.priority); // Higher priority first
  }

  dequeue() {
    return this.queue.shift(); // Removes highest priority ticket
  }

  getQueue() {
    return this.queue;
  }
}

// Simulated predefined issues for priority matching specific to NGO Katalyst
const predefinedIssues = [
  { issue: "scholarship delay", priority: 9 },
  { issue: "mentor unresponsive", priority: 7 },
  { issue: "application issue", priority: 8 },
  { issue: "event registration", priority: 6 },
  { issue: "technical support", priority: 5 },
];

const priorityQueue = new PriorityQueue();

// Function to determine priority based on similarity
const determinePriority = (summary) => {
  if (!summary) return 1; // Default priority if summary is empty

  let maxPriority = 1;
  predefinedIssues.forEach((issue) => {
    if (summary.toLowerCase().includes(issue.issue)) {
      maxPriority = Math.max(maxPriority, issue.priority);
    }
  });
  return maxPriority;
};


// Function to summarize chat history
const summarizeChat = (chatHistory) => {
  const sentences = chatHistory.map(entry => entry.query); // Extract only user queries
  const summary = sentences.join(" ").split(" ").slice(0, 60).join(" "); // Limit to 60 words
  return summary;
};

// Chatbot response and chat storage
const chatController = {
  getQuestion: asyncHandler(async (req, res) => {
    const { question, user } = req.body;
    console.log(req.body);

    if (!question) {
      throw new Error("Please fill all required fields");
    }
    
    let Answer = "";
    try {
      Answer = await generateChat(user, question);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        Answer: "Error generating response",
        responseCreated: Answer,
      });
    }

    try {
      let chatRecord = await Chat.findOne({ user: user });

      if (chatRecord) {
        chatRecord.chat.push({
          query: question,
          response: Answer,
        });
        chatRecord.summary = summarizeChat(chatRecord.chat);
        await chatRecord.save();
      } else {
        chatRecord = await Chat.create({
          user: user,
          chat: [{ query: question, response: Answer }],
          summary: summarizeChat([{ query: question, response: Answer }])
        });
        await chatRecord.save();
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
      throw new Error("Please fill all required fields");
    }

    try {
      const chatRecords = await Chat.findOne({ user: user });

      if (!chatRecords) {
        return res.status(400).json({ message: "No chat history found for this user" });
      }

      const summary = chatRecords.summary;
      const priority = determinePriority(summary);

      const ticketCreated = await Ticket.create({
        user: user,
        name: name,
        email: email,
        ticket: summary, // Store summarized conversation
        priority: priority, // Add priority level to ticket
      });

      await ticketCreated.save();

      // Add ticket to priority queue
      priorityQueue.enqueue(ticketCreated, priority);
      console.log("Current Ticket Queue:", priorityQueue.getQueue());

      // Send email using Brevo API
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "NGO Administration",
            email: "tisyamanhas22@gmail.com",
          },
          to: [{ email: email, name: name }],
          subject: "You're in the waitlist!",
          htmlContent: `<h1>Thank you for reaching out to us, your ticket has been created successfully. We will get back to you soon.</h1>`,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      res.json({ message: "Ticket created successfully with priority " + priority });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating ticket" });
    }
  }),
};

module.exports = chatController;
