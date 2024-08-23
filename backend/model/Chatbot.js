const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    chat: {
      type: [
        {
          query: String,
          response: String,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatSchema);

module.exports = {Chat};
