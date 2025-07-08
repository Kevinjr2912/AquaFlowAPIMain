import { BcryptPasswordHasher } from "../application/services/Bcrypt_service";
import { Bcrypt } from "./adapters/Bcrypt";
import { SignUpUseCase } from '../application/useCases/SignUp_useCase';
import { postgreSQLUser } from "../../users/infraestructure/dependencies";
import { SignUpController } from "./controllers/SignUp_controller";

const bcrypt = new Bcrypt();
const bcryptPasswordHasher  = new BcryptPasswordHasher(bcrypt);

// useCases
const registerUserUseCase = new SignUpUseCase(postgreSQLUser,bcryptPasswordHasher);

// controllers
export const signUpController = new SignUpController(registerUserUseCase);