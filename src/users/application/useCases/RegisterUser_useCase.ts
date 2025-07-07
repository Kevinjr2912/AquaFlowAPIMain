import { User } from "src/users/domain/entities/User";
import { UserRepository } from "src/users/domain/repositories/IUserRepository";
import { BcryptPasswordHasher } from "../services/Bcrypt_service";
import { ExistingEmailError } from "src/shared/errors/ExistingEmailError";

export class RegisterUserUseCase {
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