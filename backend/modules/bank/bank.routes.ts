import { Router } from "express";
import auth from "../../handlers/auth";
import linkBankAccount from "./controllers/linkBankAccount";
import allBankAccounts from "./controllers/allBankAccounts";
import loadBalanceFromBank from "./controllers/loadBalanceFromBank";

const bankRouter = Router();
bankRouter.use(auth);

bankRouter.post("/bank", linkBankAccount);
bankRouter.get("/", allBankAccounts);
bankRouter.post("/load", loadBalanceFromBank);

export default bankRouter;
