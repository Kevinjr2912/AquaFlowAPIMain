import { BcryptPasswordHasher } from "../application/services/BcryptPasswordHasher_service";
import { Bcrypt } from "./adapters/Bcrypt";
import { SignUpUseCase } from '../application/useCases/SignUp_useCase';
import { SignUpController } from "./controllers/SignUp_controller";
import { SignInUseCase } from "../application/useCases/SingIn_useCase";
import { BcryptComparePassword } from "../application/services/BcryptComparePassword_service";
import { JWT } from "./adapters/JWT";
import { config } from "../../core/config";
import { JWTGenerateToken } from "../application/services/JWTGenerateToken_service";
import { SignInController } from "./controllers/SignIn_controller";
import { userPostgreSQL } from "../../users/infraestructure/dependencies";

const bcrypt = new Bcrypt();
const bcryptPasswordHasher  = new BcryptPasswordHasher(bcrypt);
const bcryptComparePassword = new BcryptComparePassword(bcrypt);

const jwt = new JWT(config.SECRET_KEY!);
const jwtGenerateToken = new JWTGenerateToken(jwt);

// useCases
const signUpUseCase = new SignUpUseCase(userPostgreSQL, bcryptPasswordHasher);
const signInUseCase = new SignInUseCase(userPostgreSQL, bcryptComparePassword, jwtGenerateToken);

// controllers
export const signUpController = new SignUpController(signUpUseCase);
export const signInController = new SignInController(signInUseCase);