import { PasswordHasherRepository } from "../repositories/IPasswordHasher_repository";

export class BcryptComparePassword {
  constructor(private readonly bcryptRepository: PasswordHasherRepository) {}

  async execute(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return this.bcryptRepository.compare(plainPassword, hashedPassword);
  }
}
