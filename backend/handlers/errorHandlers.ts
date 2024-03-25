import { Request, Response, NextFunction } from "express";

const errorHandlers = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof error === "string") {
    res.status(200).json({
      status: "Users Signup Failed",
      message: error,
    });
  } else {
    res.status(400).json({
      status: "Something went wrong",
    });
  }
  next();
};
export default errorHandlers;
