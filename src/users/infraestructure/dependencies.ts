import { FindUserByIdUseCase } from "../application/useCases/FindUserById_useCase";
import { PostgreSQLUser } from "./adapters/PostgreSQL";

export const userPostgreSQL = new PostgreSQLUser();

// use cases 
export const findUserByIdUseCase = new FindUserByIdUseCase(userPostgreSQL);
