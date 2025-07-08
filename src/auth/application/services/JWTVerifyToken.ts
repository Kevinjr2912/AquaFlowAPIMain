import { AuthRepository } from "../repositories/IAuth_repository";

export class JWTVerifyToken {

  constructor(private readonly jwtRepository: AuthRepository){}

  async execute(token: string): Promise<any> {
    return await this.jwtRepository.verifyToken(token);
  }

} 