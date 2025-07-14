import { Filter } from "../entities/Filter";

export interface FilterRepository {
  createFilter(filter: Filter): Promise<void>;
  getAllFilters(): Promise<any[]>;
  findFilterById(filterId: string): Promise<Filter | null>;
}