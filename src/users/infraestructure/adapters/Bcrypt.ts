import bcrypt from "bcrypt";
import { PasswordHasherRepository } from "../../application/repositories/IPasswordHasher_repository";
import { config } from "../../../core/config";

export class Bcrypt implements PasswordHasherRepository {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(config.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
}