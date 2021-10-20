const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema(
  {
    name: {
      type: String,
      // required: "Name is required!",
      default: null,
    },

    groupIcon: {
      type: String,
      default: null,
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    lastMessage : {
      type : String, 
      default : null,  
    },

    lastMessageBy: {
      type : mongoose.Schema.Types.ObjectId,
      ref:'User',
      default:null
    },

    lastMessageAt: {
      type : Date,
      default : Date.now,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = Chatroom;
