import { Request, Response } from "express";
import usersModel from "../../../models/users.model";
import bcrypt from "bcrypt";

const userSignup = async (req: Request, res: Response) => {
  const { email, password, confirm_password, name, auth_id, balance } =
    req.body;
  console.log(req.body);

  //general validations

  if (!email) throw "email required!";
  if (!name) throw "name required!";
  if (!password) throw "password required!";
  if (!confirm_password) throw "confirm password required!";

  if (name.length < 3) throw "Name must consist atleast 3 characters";
  if (password != confirm_password)
    throw "Password and Confirm Password must be same";

  //database validations

  const getUserEmail = await usersModel.findOne({
    email,
  });
  if (getUserEmail) throw "email already exist";
  let encrypt_password = await bcrypt.hash(password, 8);
  await usersModel.create({
    email,
    password: encrypt_password,
    name,
    auth_id,
    balance,
  });

  res.status(200).json({ message: "Users Signup success" });
};
export default userSignup;
