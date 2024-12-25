import express from 'express';
import { signupUser, signinUser } from '../controllers/userController.js';
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();


userRouter.post('/SignUp', signupUser);
userRouter.post('/SignIn', signinUser);

export default userRouter;