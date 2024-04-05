import { Request, Response, NextFunction } from "express";
import usersModel from "../models/users.model";
import jwt from "jsonwebtoken";

const auth = async (req: any, res: Response, next: NextFunction) => {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) throw "Authorization failed";

  // const auth_id = req.headers.authorization.split(" ")[1];

  const accessToken = req.headers.authorization.split(" ")[1];
  // console.log("accessToken");

  // console.log(accessToken);

  // if (!auth_id) throw "Auth error. No auth id !";

  // const getAuthUser = await usersModel.findOne({
  //   auth_id: auth_id,
  // });
  if (!accessToken) throw "authorization error!";

  try {
    const jwtVerify = jwt.verify(accessToken, process.env!.jwt_sceret!);
    req.user = jwtVerify;
  } catch (e) {
    console.log(e);
    throw "jwt error";
  }
  next();
};
export default auth;
