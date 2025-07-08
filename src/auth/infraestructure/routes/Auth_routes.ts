import express from 'express';
import { signUpController } from '../dependencies';

export const authRouter = express.Router();

authRouter.post("/sign-up", signUpController.execute);