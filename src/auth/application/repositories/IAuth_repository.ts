export interface AuthRepository {
  generateToken(payload: object): Promise<string>;
  verifyToken(token: string): Promise<any>;
}