import { FilterRepository } from "../../domain/repositories/IFilter_repository";
import { FilterDTO } from "../dtos/output/Filter_dto";

export class GetAllFiltersUseCase {
  constructor(private readonly filterRepository: FilterRepository){}

  async execute(): Promise<FilterDTO[]> {
    return await this.filterRepository.getAllFilters();
  }
}