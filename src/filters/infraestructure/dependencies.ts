import { findUserByIdUseCase, userPostgreSQL } from "../../users/infraestructure/dependencies";
import { AssociateFilterToUserUseCase } from "../application/useCases/AssociateFilterToUser_useCase";
import { CreateFilterUseCase } from "../application/useCases/CreateFilter_useCase";
import { GetAllFiltersUseCase } from "../application/useCases/GetAllFilters_useCase";
import { PostgreSQL } from "./adapters/PostgreSQL";
import { CreateFilterController } from "./controllers/CreateFiltrer_controller";
import { GetAllFiltersController } from "./controllers/GetAllFilters_controller";
import { AssociateFilterToUserController } from './controllers/AssociateFilterToUser_controller';
import { GetFiltersByUserIdUseCase } from "../application/useCases/GetFiltersByUserId_useCase";
import { GetFiltersByUserIdController } from "./controllers/GetFiltersByUserId_controller";

const filterPostgreSQL = new PostgreSQL();

// use cases
const createFilterUseCase = new CreateFilterUseCase(filterPostgreSQL);
const getAllFiltersUseCase = new GetAllFiltersUseCase(filterPostgreSQL);
const getFiltersByUserId = new GetFiltersByUserIdUseCase(userPostgreSQL, filterPostgreSQL);
const associateFilterToUserUseCase = new AssociateFilterToUserUseCase(userPostgreSQL, filterPostgreSQL);

// controllers
export const createFilterController = new CreateFilterController(createFilterUseCase, findUserByIdUseCase);
export const getAllFiltersController = new GetAllFiltersController(getAllFiltersUseCase);
export const getFiltersByUserIdController = new GetFiltersByUserIdController(getFiltersByUserId);
export const associateFilterToUserController = new AssociateFilterToUserController(associateFilterToUserUseCase);
