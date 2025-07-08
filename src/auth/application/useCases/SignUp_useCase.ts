import { ExistingEmailError } from "../../../shared/errors/ExistingEmail_error";
import { User } from "../../../users/domain/entities/User";
import { UserRepository } from "../../../users/domain/repositories/IUser_repository";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher_service";

export class SignUpUseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptPasswordHasher
  ){}

  async execute(user: User): Promise<void> {
    const passwordHashed = await this.bcryptService.execute(user.getPassword());
    user.setPassword(passwordHashed);

    const existsEmail = await this.userRepository.existsByEmail(user.getEmail());

    if (existsEmail) throw new ExistingEmailError("Email is already in use");

    return this.userRepository.registerUser(user);
  }

}