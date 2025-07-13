import { FilterLayer } from "../../domain/entities/FilterLayer";
import { FilterLayerEfficiency } from "../../domain/valueObjects/filterLayer/FilterLayerEfficiency_valueObject";
import { FilterLayerId } from "../../domain/valueObjects/filterLayer/FilterLayerId_valueObject";
import { FilterLayerLifeTime } from "../../domain/valueObjects/filterLayer/FilterLayerLifeTime_valueObject";
import { FilterLayerName } from "../../domain/valueObjects/filterLayer/FilterLayerName_valueObject";
import { CreateFilterLayerDTO } from "../dtos/input/CreateFilterLayer_dto";

export class FilterLayerMapper {

  static toFilterLayers(filterLayersDTO: CreateFilterLayerDTO[]): FilterLayer[] {
    return filterLayersDTO.map((filterLayerDTO) => 
      new FilterLayer(
        new FilterLayerId(filterLayerDTO.filterLayerId),
        new FilterLayerName(filterLayerDTO.name),
        new FilterLayerLifeTime(filterLayerDTO.lifeTime),
        new FilterLayerEfficiency(filterLayerDTO.efficiency)
      )
    );
  }
  
}
