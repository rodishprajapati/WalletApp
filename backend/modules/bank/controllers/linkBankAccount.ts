import { Request, Response } from "express";
import bcrypt from "bcrypt";
import bankModel from "../../../models/banks.model";

const linkBankAccount = async (req: any, res: Response) => {
  const { bank_name, account_name, account_number } = req.body;
  console.log(req.body);

  //general validations

  if (!bank_name) throw "bank name is  required!";
  if (!account_name) throw "account name required!";
  if (!account_number) throw "account number required!";

  //database validations

  await bankModel.create({
    user_id: req.user.user_id,
    bank_name,
    account_name,
    account_number,
  });

  res.status(200).json({ message: "bank account linked" });
};
export default linkBankAccount;
