import express from 'express';
import { registerUserController } from '../dependencies';

export const userRouter = express.Router()

userRouter.post("/", registerUserController.execute);