import { AuthRepository } from "../repositories/IAuth_repository";

export class JWTGenerateToken {

  constructor(private readonly jwtRepository: AuthRepository){}

  async execute(payload: object): Promise<string> {
    return await this.jwtRepository.generateToken(payload);
  }

} 