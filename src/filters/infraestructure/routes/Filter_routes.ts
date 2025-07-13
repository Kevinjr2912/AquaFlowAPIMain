import express from 'express';
import { createFilterController } from '../dependencies';

export const filterRouter = express.Router();

filterRouter.post("/", createFilterController.execute);