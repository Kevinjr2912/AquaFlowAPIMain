import { TypeSensorName } from "../../../domain/valueObjects/sensor/SensorName_valueObject";

export interface CreateSensorDTO {
  sensorId: string,
  name: TypeSensorName,
  model: string,
  unitMeasurement: string
}