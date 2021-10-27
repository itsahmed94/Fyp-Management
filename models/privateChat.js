const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const privateChatSchema = new Schema(
  {
    

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


  },
  { timestamps: true }
);

const PrivateChat = mongoose.model("PrivateChat", privateChatSchema);

module.exports = PrivateChat;
