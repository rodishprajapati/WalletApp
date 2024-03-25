import { Request, Response } from "express";
import bankModel from "../../../models/banks.model";
import mongoose from "mongoose";
import transactionsModel from "../../../models/transcations.model";
import usersModel from "../../../models/users.model";
const loadBalanceFromBank = async (req: any, res: Response) => {
  const { bank_id, balance } = req.body;
  //console.log(req.body);

  if (!bank_id) throw "Bank id is required!";
  if (!balance) throw "Balance is required!";

  //bank part
  const getBank = await bankModel.findOne({
    _id: bank_id,
    users_id: req.user.user_id,
  });
  if (!getBank) throw "Bank not found";

  if (getBank.balance < balance) throw "not enough balance ";

  //amount is loaded
  const session = await mongoose.startSession();
  await session.withTransaction(async (session) => {
    await bankModel.updateOne(
      {
        _id: bank_id,
        user_id: req.user.user_id,
      },
      {
        $inc: {
          balance: balance * -1,
        },
      },
      {
        session: session,
      }
    );

    //log
    await transactionsModel.create([
      {
        user_id: req.user.user_id,
        transaction_type: "load",
        balance,
        info: `loaded ${balance} from ${getBank.bank_name} (${getBank.account_number})`,
      },
    ]);

    //user side
    await usersModel.updateOne(
      {
        _id: req.user.user_id,
      },
      {
        $inc: {
          balance,
        },
      },
      {
        session,
      }
    );
  });
  res.status(200).json({
    status: "success",
    data: "amount loaded successfully",
  });
};
export default loadBalanceFromBank;
