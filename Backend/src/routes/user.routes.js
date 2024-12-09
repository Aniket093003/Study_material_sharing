import express from 'express';
import { signupUser, signinUser } from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.post('/SignUp', signupUser);
userRouter.post('/SignIn', signinUser);

export default userRouter;