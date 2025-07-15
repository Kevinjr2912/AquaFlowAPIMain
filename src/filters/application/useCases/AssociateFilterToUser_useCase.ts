import { Filter } from '../../../filters/domain/entities/Filter';
import { FilterRepository } from '../../../filters/domain/repositories/IFilter_repository';
import { FilterId } from '../../../filters/domain/valueObjects/filter/FilterId_valueObject';
import { FilterAlreadyAssignedError } from '../../../shared/errors/FilterAlreadyAssigned_error';
import { FilterNotFoundError } from '../../../shared/errors/FilterNotFound_error';
import { UserNotFoundError } from '../../../shared/errors/UserNotFound_error';
import { UserRepository } from '../../../users/domain/repositories/IUser_repository';
import { UserId } from '../../../users/domain/valueObjects/UserId_valueObject';

export class AssociateFilterToUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly filterRepository: FilterRepository
  ) {}

  async execute(userId: string, filterId: string): Promise<Filter> {
    const newUserId = new UserId(userId);
    const newFilterId = new FilterId(filterId);

    await this.ensureUserExists(newUserId);
    
    const filter = await this.getFilter(newFilterId);

    this.verifyFilterIsAssignable(filter);

    filter.assignToUser(newUserId);

    await this.filterRepository.associateFilterToUser(filter);

    return filter;
  }

  private async ensureUserExists(userId: UserId): Promise<void> {
    const user = await this.userRepository.findUserById(userId.value);
    if (!user) {
      throw new UserNotFoundError(`No user found with id: ${userId.value}`);
    }
  }

  private async getFilter(filterId: FilterId): Promise<Filter> {
    const filter = await this.filterRepository.findFilterById(filterId.value);
    if (!filter) {
      throw new FilterNotFoundError(`No filter found with id: ${filterId.value}`);
    }
    return filter;
  }

  private verifyFilterIsAssignable(filter: Filter): void {
    if (filter.getUserId() && filter.getStatus()) {
      throw new FilterAlreadyAssignedError("The filter is already associated with a user and cannot be reassigned.");
    }
  }
}
