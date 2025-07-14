import { findUserByIdUseCase } from "../../users/infraestructure/dependencies";
import { CreateFilterUseCase } from "../application/useCases/CreateFilter_useCase";
import { GetAllFiltersUseCase } from "../application/useCases/GetAllFilters_useCase";
import { PostgreSQL } from "./adapters/PostgreSQL";
import { CreateFilterController } from "./controllers/CreateFiltrer_controller";
import { GetAllFiltersController } from "./controllers/GetAllFilters_controller";

const postgreSQL = new PostgreSQL();

// use cases
const createFilterUseCase = new CreateFilterUseCase(postgreSQL);
const getAllFiltersUseCase = new GetAllFiltersUseCase(postgreSQL);

// controllers
export const createFilterController = new CreateFilterController(createFilterUseCase, findUserByIdUseCase);
export const getAllFiltersController = new GetAllFiltersController(getAllFiltersUseCase);
