import { UserNotFoundError } from "../../../shared/errors/UserNotFound_error";
import { UserRepository } from "../../../users/domain/repositories/IUser_repository";
import { UserId } from "../../../users/domain/valueObjects/UserId_valueObject";
import { Filter } from "../../domain/entities/Filter";
import { FilterRepository } from "../../domain/repositories/IFilter_repository";

export class GetFiltersByUserId {
  constructor(
    private readonly filterRepository: FilterRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<Filter[]> {
    const newUserId = new UserId(userId);

    await this.ensureUserExists(newUserId);

    return await this.filterRepository.getFiltersByUserId(userId);
  }

  private async ensureUserExists(userId: UserId): Promise<void> {
    const user = await this.userRepository.findUserById(userId.value);
    if (!user) {
      throw new UserNotFoundError(`No user found with id: ${userId.value}`);
    }
  }
}
