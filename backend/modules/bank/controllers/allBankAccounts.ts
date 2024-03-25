import { Request, Response } from "express";
import bankModel from "../../../models/banks.model";

// Protected route...

const allBankAccounts = async (req: any, res: Response) => {
  const data = await bankModel.find({
    user_id: req.user.user_id,
  });

  res.status(200).json({
    status: "success",
    data,
  });
};

export default allBankAccounts;
