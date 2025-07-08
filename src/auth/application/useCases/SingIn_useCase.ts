import { UnauthorizedUserError } from "../../../shared/errors/UnauthorizedUser_error";
import { UserRepository } from "../../../users/domain/repositories/IUser_repository";
import { UserEmail } from "../../../users/domain/valueObjects/UserEmail_valueObject";
import { UserPassword } from "../../../users/domain/valueObjects/UserPassword_valueObject";
import { BcryptComparePassword } from "../services/BcryptComparePassword_service";
import { JWTGenerateToken } from "../services/JWTGenerateToken_service";

export class SignInUseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly comparePasswordService: BcryptComparePassword,
    private readonly generateTokenService: JWTGenerateToken
  ){}

  async execute(email: string, plainPassword: string): Promise<string>{

    const userEmail = new UserEmail(email).value; 
    const userPlainPassword = UserPassword.create(plainPassword);

    const user = await this.userRepository.findUserByEmail(userEmail);

    if (!user) throw new UnauthorizedUserError("Invalid Email");

    const isValidPassword = await this.comparePasswordService.execute(userPlainPassword.value, user.getPassword());

    if(!isValidPassword) throw new UnauthorizedUserError("Invalid Password");

    return await this.generateTokenService.execute({
      id: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      role: user.getUserRole()
    }); 

  }
}