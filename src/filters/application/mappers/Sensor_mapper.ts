import { Sensor } from "../../domain/entities/Sensor";
import { SensorId } from "../../domain/valueObjects/sensor/SensorId_valueObject";
import { SensorModel } from "../../domain/valueObjects/sensor/SensorModel_valueObject";
import { SensorName } from "../../domain/valueObjects/sensor/SensorName_valueObject";
import { SensorUnitMeasurement } from "../../domain/valueObjects/sensor/SensorUnitMeasurement_valueObject";
import { CreateSensorDTO } from "../dtos/input/CreateSensor_dto";

export class SensorMapper {

  static toSensors( sensorsDTO: CreateSensorDTO[] ): Sensor[] {
  
    return sensorsDTO.map((sensorDTO) => 
      new Sensor(
        new SensorId(sensorDTO.sensorId),
        new SensorName(sensorDTO.name),
        new SensorModel(sensorDTO.model),
        new SensorUnitMeasurement(sensorDTO.unitMeasurement)
      )
    );

  }

}