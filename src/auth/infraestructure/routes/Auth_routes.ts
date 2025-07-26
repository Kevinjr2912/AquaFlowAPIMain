import express from 'express';
import { signInController, signUpController } from '../dependencies';

export const authRouter = express.Router();

authRouter.post("/sign-up", signUpController.execute);
authRouter.post("/sign-in", signInController.execute);