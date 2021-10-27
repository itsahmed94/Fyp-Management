const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      default: null,
   
    },

    // groupIcon: {
    //   type: String,
    //   default: null,
    // },

    groupInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fypGroup",
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
    
    members: {
      type :[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default : []
    } 

  },
  { timestamps: true }
);

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = Chatroom;
