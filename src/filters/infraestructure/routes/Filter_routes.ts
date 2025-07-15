import express from 'express';
import { associateFilterToUserController, createFilterController, getAllFiltersController, getFiltersByUserIdController } from '../dependencies';

export const filterRouter = express.Router();

filterRouter.post("/", createFilterController.execute);
filterRouter.get("/", getAllFiltersController.execute);
filterRouter.get("/by-user", getFiltersByUserIdController.execute);
filterRouter.patch("/:filterId/assign-user", associateFilterToUserController.execute);