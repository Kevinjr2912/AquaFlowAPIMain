import { AuthRepository } from "../../application/repositories/IAuth_repository";
import jwt from 'jsonwebtoken';

export class JWT implements AuthRepository {

  constructor(private jwtSecret: string) {}

  async generateToken(payload: object): Promise<string> {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "2h" });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecret);
  }

}