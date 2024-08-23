const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const chatbotRouter = require("./routes/chatbotRoute");
const chatController = require("./controllers/chatBotController");
const userRouter = require("./routes/userRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));



app.use("/", chatbotRouter);
app.use("/" , userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
