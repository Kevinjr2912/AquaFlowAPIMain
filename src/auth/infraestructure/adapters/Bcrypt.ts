import bcrypt from "bcrypt";
import { config } from "../../../core/config";
import { PasswordHasherRepository } from "../../application/repositories/IPasswordHasher_repository";

export class Bcrypt implements PasswordHasherRepository {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(config.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}