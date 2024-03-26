import { Request, Response } from "express";
import transactionsModel from "../../../models/transcations.model";
const getTransactions = async (req: any, res: Response) => {
  const { type } = req.query;

  let transactionFilter = {};
  if (type) {
    transactionFilter = { transaction_type: type };
  }
  const transactions = await transactionsModel
    .find({
      user_id: req.user.user_id,
      ...transactionFilter,
    })
    .sort("-_id")
    .limit(100);

  //   let transactions: any;

  //   if (!type) {
  //     transactions = await transactionsModel
  //       .find({
  //         user_id: req.user.user_id,
  //       })
  //       .sort("_id")
  //       .limit(5);
  //   } else {
  //     transactions = await transactionsModel
  //       .find({
  //         user_id: req.user.user_id,
  //         transaction_type: type,
  //       })
  //       .sort("-_id")
  //       .limit(5);
  //   }
  res.status(200).json({
    status: "success",
    transactions,
  });
};
export default getTransactions;
