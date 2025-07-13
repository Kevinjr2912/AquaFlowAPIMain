import { findUserByIdUseCase } from "../../users/infraestructure/dependencies";
import { CreateFilterUseCase } from "../application/useCases/CreateFilter_useCase";
import { PostgreSQL } from "./adapters/PostgreSQL";
import { CreateFilterController } from "./controllers/CreateFiltrer_controller";

const postgreSQL = new PostgreSQL();

// use cases
const createFilterUseCase = new CreateFilterUseCase(postgreSQL);

// controllers
export const createFilterController = new CreateFilterController(createFilterUseCase, findUserByIdUseCase);
