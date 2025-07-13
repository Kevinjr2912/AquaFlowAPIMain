import { TypeFilterLayer } from "../../../domain/valueObjects/filterLayer/FilterLayerName_valueObject";

export interface CreateFilterLayerDTO {
  filterLayerId: string,
  name:          TypeFilterLayer,
  lifeTime:      number,
  efficiency:    number
}