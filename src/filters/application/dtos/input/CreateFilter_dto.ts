import { CreateFilterLayerDTO } from "./CreateFilterLayer_dto"
import { CreateSensorDTO } from "./CreateSensor_dto"

export interface CreateFilterDTO {
  filterId:     string,
  createdBy:    string
  model:        string,
  dateRecord:   Date,
  isActive:     boolean
  filterLayers: CreateFilterLayerDTO[],
  sensors:      CreateSensorDTO[]
}

