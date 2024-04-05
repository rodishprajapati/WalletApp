import { Request, Response } from "express";
import usersModel from "../../../models/users.model";

//protected route

const userProfile = async (req: any, res: Response) => {
  // console.log(req.query);
  // const { email } = req.query;
  // console.log("data from data.headers.auth");
  // console.log(req.headers.authorization);
  // console.log(req.user.user_id);

  const userData = await usersModel.findOne({
    _id: req.user.user_id,
  });
  if (!userData) throw "User doesnot exists";

  res.status(200).json({
    status: "profile page",
    message: "hello from profile",
    data: userData,
  });
};
export default userProfile;
