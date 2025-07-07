import { User } from "../entities/User";

export interface UserRepository {
  registerUser(user: User): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}