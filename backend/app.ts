import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();
import userRouter from "./modules/users/users.routes";
import "./models";
import errorHandlers from "./handlers/errorHandlers";
import bankRouter from "./modules/bank/bank.routes";

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.mongo_connect!, {}).then(() => {
  console.log("mongo connected succesfully");
});

app.use("/users", userRouter);
app.use("/linkBankAccount", bankRouter);

app.use(errorHandlers);

app.listen(8001, () => {
  console.log("server started!");
});
