import { PasswordHasherRepository } from "../repositories/IPasswordHasher_repository";

export class BcryptPasswordHasher {
  constructor(private readonly bcryptRepository: PasswordHasherRepository){}

  async execute(plainPassword: string): Promise<string> {
    return this.bcryptRepository.hash(plainPassword)
  }
}