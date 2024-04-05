import { Router } from "express";
import auth from "../../handlers/auth";
import transferMoney from "./controllers/transferMoney";
import getTransactions from "./controllers/getTransactions";

const fundTransfer = Router();
fundTransfer.use(auth);

fundTransfer.post("/UserToUser", transferMoney);
fundTransfer.get("/transactionsDetail", getTransactions);

export default fundTransfer;
