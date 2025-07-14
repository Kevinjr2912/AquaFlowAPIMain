import express from 'express';
import { createFilterController, getAllFiltersController } from '../dependencies';

export const filterRouter = express.Router();

filterRouter.post("/", createFilterController.execute);
filterRouter.get("/", getAllFiltersController.execute);