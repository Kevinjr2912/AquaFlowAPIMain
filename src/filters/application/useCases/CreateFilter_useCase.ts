import { PermissionDeniedError } from "../../../shared/errors/PermissionDenied_error";
import { User } from "../../../users/domain/entities/User";
import { Filter } from "../../domain/entities/Filter";
import { FilterRepository } from "../../domain/repositories/IFilter_repository";
import { CreateFilterDTO } from "../dtos/input/CreateFilter_dto";
import { FilterMapper } from "../mappers/Filter_mapper";
import { FilterLayerMapper } from "../mappers/FilterLayer_mapper";
import { SensorMapper } from "../mappers/Sensor_mapper";

export class CreateFilterUseCase {

  constructor(
    private readonly filterRepository: FilterRepository
  ){}

  async execute(filterDTO: CreateFilterDTO, user: User): Promise<Filter> {

    this.validatePermissions(user);

    const filter = FilterMapper.toFilter(filterDTO)
    filter.addSensors(SensorMapper.toSensors(filterDTO.sensors))
    filter.addFilterLayers( FilterLayerMapper.toFilterLayers(filterDTO.filterLayers))

    filter.validateStructure();

    await this.filterRepository.createFilter(filter);

    return filter;
    
  }

  private validatePermissions(user: User): void {
    if (!user.isAdmin()) {
      throw new PermissionDeniedError("Only administrators can add filters");
    }
  }

}