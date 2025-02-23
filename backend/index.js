const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const {chatbotRouter,ticketController} = require("./routes/chatbotRoute");
const userRouter = require("./routes/userRoute");

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



app.use("/", chatbotRouter);
app.use("/" , userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
