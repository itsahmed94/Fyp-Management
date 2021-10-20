const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Chatroom is required!",
      ref: "Chatroom",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Chatroom is required!",
      ref: "User",
    },
    message: {
      type: String,
      required: "Message is required!",
    },

    // lastMessageBy: {
    //   type : mongoose.Schema.Types.ObjectId,
    //   ref:'User',
      
    // },

    // lastMessageAt: {
    //   type : Date,
    //   default : Date.now,
    // },

    fileUpload: [{
      type: String,
      default : null
    },
  ],

  }, { timestamps: true });
  
  const Message = new mongoose.model("Message", messageSchema);

  module.exports = Message;