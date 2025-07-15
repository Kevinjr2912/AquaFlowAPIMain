import { Filter } from "../entities/Filter";

export interface FilterRepository {
  createFilter(filter: Filter): Promise<void>;
  getAllFilters(): Promise<any[]>;
  getFiltersByUserId(userId: string): Promise<Filter[]>;
  findFilterById(filterId: string): Promise<Filter | null>;
  associateFilterToUser(filter: Filter): Promise<void>;
}