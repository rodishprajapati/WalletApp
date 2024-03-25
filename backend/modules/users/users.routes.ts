import { Router } from "express";
import userSignup from "./controller/userSignup";
import userLogin from "./controller/userLogin";
import userProfile from "./controller/userProfile";
import auth from "../../handlers/auth";
import editProfile from "./controller/editProfile";

const userRouter = Router();
//Auth
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

//loggedIn User

userRouter.use(auth);

userRouter.get("/myprofile", userProfile);
userRouter.patch("/my-profile", editProfile);

export default userRouter;
