import { UserNotFoundError } from "../../../shared/errors/UserNotFound_error";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/IUser_repository";

export class FindUserByIdUseCase {

  constructor(private readonly userRepository: UserRepository){}

  async execute(userId: string): Promise<User> {

    const user = await this.userRepository.findUserById(userId);

    if(!user) throw new UserNotFoundError(`No user was found with the id: ${userId}`);

    return user;

  }

}