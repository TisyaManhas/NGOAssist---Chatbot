const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ticket: {
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


const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = {Ticket};