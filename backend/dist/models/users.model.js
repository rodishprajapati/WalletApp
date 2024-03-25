// const { default: mongoose } = require("mongoose");
import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  // const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    auth_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const usersModel = mongoose.model("users", usersSchema);
exports.default = usersModel;
