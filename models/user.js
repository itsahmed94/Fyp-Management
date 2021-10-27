const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      // required: [true, "error"],
      unique: true,
    },

    studentId: {
      type: Number,
      default: null,
      unique: [true, "error"],
    },

    password: {
      type: String,
      required: [true, "error"],
      select: false,
    },

    email: {
      type: String,
      required: [true, "error"],
      unique: [true, "error"],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    role: {
      type: String,
      required: [true, "error"],
      enum: ["student", "admin", "supervisor"],
      default: "student",
    },

    uploadImage: {
      type: String,
      default: null,
    },

    tokens: {
      type: [
        {
          type: String,
          // select:false,
          // default:''
        },
      ],
      select: false,
      default:[]
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
