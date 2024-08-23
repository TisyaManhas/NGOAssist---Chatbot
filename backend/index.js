const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { generateContent, generateChat } = require("./controllers/gemini");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.post("/chat", async (req, res) => {
  const { text } = req.body;
  const response = await generateChat(text);
  res.send(response);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
