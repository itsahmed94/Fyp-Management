const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const proposalSchema = new Schema(
  {
    title: {
        type: String,
        default: null,
    },

    name: {
        type: String,
        default: null,
    },

    description: {
        type: String,
        default: null,
      },

    SupervisorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    co_supervisorName: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },

    studentGroup: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fypGroup",
      },
    

    uploadDoc: {
        type: String,
        default: null,
    },

    year: {
        type: Number,
        default: null,
    },

    status : {
        type: String,
        default: null,

    },

  },

  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
