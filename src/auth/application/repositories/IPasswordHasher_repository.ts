export interface PasswordHasherRepository {
  hash(password: string): Promise<string>;
}