const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const fypGroupSchema = new Schema({
    groupMembers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }

   

  }, { timestamps: true });
  
  const fypGroup = new mongoose.model("fypGroup", fypGroupSchema);

  module.exports = fypGroup;