import { RegisterUserUseCase } from "../application/useCases/RegisterUser_useCase";
import { PostgreSQL } from "./adapters/PostgreSQL";
import { BcryptPasswordHasher } from "../application/services/Bcrypt_service";
import { Bcrypt } from "./adapters/Bcrypt";
import { RegisterUserController } from "./controllers/RegisterUser_controller";

const postgreSQL = new PostgreSQL();
const bcrypt = new Bcrypt();
const bcryptPasswordHasher  = new BcryptPasswordHasher(bcrypt);

// useCases
const registerUserUseCase = new RegisterUserUseCase(postgreSQL,bcryptPasswordHasher);

// controllers
export const registerUserController = new RegisterUserController(registerUserUseCase);