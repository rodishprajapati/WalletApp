import { Router } from "express";
import auth from "../../handlers/auth";
import linkBankAccount from "./controllers/linkBankAccount";
import allBankAccounts from "./controllers/allBankAccounts";
import loadBalanceFromBank from "./controllers/loadBalanceFromBank";
import transferMoney from "../transaction/controllers/transferMoney";
import withdrawToBank from "./controllers/withdrawToBank";

const bankRouter = Router();
bankRouter.use(auth);

//show all linked banked accounts
bankRouter.get("/", allBankAccounts);

//link new bank account
bankRouter.post("/bank", linkBankAccount);

//get money from bank account to wallet
bankRouter.post("/load", loadBalanceFromBank);

//withdraw from wallet to bank
bankRouter.post("/withdraw", withdrawToBank);

// bankRouter.post("/userToUser", transferMoney);

export default bankRouter;
