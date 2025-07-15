import express from 'express';
import { associateFilterToUserController, createFilterController, getAllFiltersController } from '../dependencies';

export const filterRouter = express.Router();

filterRouter.post("/", createFilterController.execute);
filterRouter.get("/", getAllFiltersController.execute);
filterRouter.patch("/:filterId/assign-user", associateFilterToUserController.execute);