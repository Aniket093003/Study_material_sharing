import express from 'express';
import { signupUser, signinUser } from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.post('/register', signupUser);
userRouter.post('/login', signinUser);

export default userRouter;