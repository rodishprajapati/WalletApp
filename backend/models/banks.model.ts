import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    account_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const bankModel = mongoose.model("banks", bankSchema);
export default bankModel;
