const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { systemPrompt } = require("../constants");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstructions: systemPrompt,
});
const chat = model.startChat({
  history: [],
});

async function run() {
  const prompt = "Write a story about an AI and magic in 30 words";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

async function generateContent(text) {
  const result = await model.generateContent(text);
  const response = await result.response;
  const text = response.text();
  return text;
}

async function generateChat(text) {
  const result = await chat.sendMessage(text);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = { generateContent, generateChat };
