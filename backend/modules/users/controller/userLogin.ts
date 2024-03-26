import { Request, Response } from "express";
import usersModel from "../../../models/users.model";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // const unique_Id = uuid();

  //general validations

  if (!email) throw "email required!";
  if (!password) throw "password required!";

  const getUser = await usersModel
    .findOne({
      email,
    })
    .select("+password");
  if (!getUser) throw "email doesnt exist";

  const checkPassword = await bcrypt.compare(password, getUser.password);
  if (!checkPassword) throw "email  and password doesnt match";

  // console.log(unique_Id);

  // console.log(email);
  // await usersModel.updateOne({ email: email }, { auth_id: unique_Id });

  const jwtpayLoad = {
    user_id: getUser._id,
  };

  const accessToken = jwt.sign(jwtpayLoad, process.env!.jwt_sceret!, {
    expiresIn: "90 days",
  });

  res.status(200).json({ message: "Users LogIn sucessfully", accessToken });
};
export default userLogin;
