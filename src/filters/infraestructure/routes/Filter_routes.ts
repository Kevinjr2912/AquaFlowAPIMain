import express from 'express';
import { associateFilterToUserController, createFilterController, getAllFiltersController, getFiltersByUserIdController } from '../dependencies';
import { authenticateJWT } from '../../../auth/infraestructure/middlewares/AuthenticateJWT_middleware';
import { jwtVerifyToken } from '../../../auth/infraestructure/dependencies';

export const filterRouter = express.Router();

filterRouter.post("/", authenticateJWT(jwtVerifyToken), createFilterController.execute);
filterRouter.get("/", authenticateJWT(jwtVerifyToken) ,getAllFiltersController.execute);
filterRouter.get("/by-user", authenticateJWT(jwtVerifyToken) ,getFiltersByUserIdController.execute);
filterRouter.patch("/:filterId/assign-user", authenticateJWT(jwtVerifyToken) ,associateFilterToUserController.execute);