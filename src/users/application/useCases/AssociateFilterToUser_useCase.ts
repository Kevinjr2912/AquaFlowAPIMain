import { Filter } from '../../../filters/domain/entities/Filter';
import { FilterRepository } from '../../../filters/domain/repositories/IFilter_repository';
import { FilterAlreadyAssignedError } from '../../../shared/errors/FilterAlreadyAssigned_error';
import { FilterNotFoundError } from '../../../shared/errors/FilterNotFound_error';
import { UserNotFoundError } from '../../../shared/errors/UserNotFound_error';
import { UserRepository } from '../../domain/repositories/IUser_repository';
export class AssociateFilterToUserUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly filterRepository: FilterRepository 
  ){}

  async execute(userId: string, filterId: string): Promise<void> {
    const user = await this.getUser(userId);
    const filter = await this.getFilter(filterId);

    await this.ensureFilterIsNotAssignedToUser(filter);
    await this.filterRepository.associateFilterToUser(user.getUserId(), filter.getId());
  }

  private async getUser(userId: string) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new UserNotFoundError(`No user found with id: ${userId}`);
    return user;
  }

  private async getFilter(filterId: string) {
    const filter = await this.filterRepository.findFilterById(filterId);
    if (!filter) throw new FilterNotFoundError(`No filter found with id: ${filterId}`);
    return filter;
  }

  private async ensureFilterIsNotAssignedToUser(filter: Filter) {
    if (filter.getUserId() && filter.getStatus()) {
      throw new FilterAlreadyAssignedError("The filter is already associated with a user and cannot be reassigned.");
    }
  }

}