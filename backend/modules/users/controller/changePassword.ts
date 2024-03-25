import { Request, Response } from "express";
import usersModel from "../../../models/users.model";
import bcrypt from "bcrypt";

const changePassword = async (req: any, res: Response) => {
  const { current_password, new_password, confirm_password } = req.body;

  if (!current_password) throw "current Password required!!";
  if (!new_password) throw "current Password required!!";
  if (!confirm_password) throw "current Password required!!";

  const getUser = await usersModel
    .findOne({
      _id: req.user.user_id,
    })
    .select("+password");
  if (!getUser) throw "User doesnt Exist";

  // if user exist then only we compare password

  let comparePassword = await bcrypt.compare(
    current_password,
    getUser.password
  );

  //if pawwsord matches, comparePassword gets a value

  if (!comparePassword) throw "current password invalid ";

  //if everything is okay then only update password

  //hash new password using bcrypt
  let encryptedPassword = await bcrypt.hash(new_password, 8);
  //update
  await usersModel.updateOne(
    {
      _id: req.user.user_id,
    },
    {
      password: encryptedPassword,
    }
  );

  //update completed

  res.status(200).json({
    status: "success",
    message: "password updated successfully!",
  });
};
export default changePassword;
