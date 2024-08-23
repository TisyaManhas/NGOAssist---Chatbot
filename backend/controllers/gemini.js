const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { systemPrompt } = require("../constants");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {},
  systemInstruction:
    "if you don't know the answer please reply just with 0," + systemPrompt,
});
const model2 = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {},
  systemInstruction: systemPrompt,
});
const chat2 = model2.startChat({
  history: [],
});
const chat = model.startChat({
  history: [],
});

async function run() {
  const prompt = "Write a story about an AI and magic in 30 words";
  const result = await model.generateContent(prompt);
  const response =  result.response;
  const text = response.text();
  console.log(text);
}
async function generateChatFromModel2(text) {
  const result = await chat2.sendMessage(text);
  const response =  result.response;
  const resultText = response.text();
  return resultText;
}
async function generateContent(text) {
  console.log(text);
  const result = await model.generateContent(text);
  console.log(result);
  const response =  result.response;
  const resultText = response.text();
  return resultText;
}

async function generateChat(text) {
  const result = await chat.sendMessage(text);
  const response =  result.response;
  let resultText = response.text();
//   console.log("response model1:" + resultText);
  if (resultText[0] === "0") {
    // console.log("model2");
    resultText = await generateChatFromModel2(text);
    // console.log(resultText);
  }
  return resultText;
}

module.exports = { generateContent, generateChat };
