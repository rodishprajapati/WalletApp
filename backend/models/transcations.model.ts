import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["load", "withdraw", "sent", "received"],
    },
    balance: {
      type: Number,
    },
    info: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const transactionsModel = mongoose.model("transactions", transactionsSchema);
export default transactionsModel;
