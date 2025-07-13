import { SensorId } from "../valueObjects/sensor/SensorId_valueObject";
import { SensorModel } from "../valueObjects/sensor/SensorModel_valueObject";
import { SensorName } from "../valueObjects/sensor/SensorName_valueObject";
import { SensorUnitMeasurement } from "../valueObjects/sensor/SensorUnitMeasurement_valueObject";

export class Sensor {

  constructor(
    private readonly sensorId: SensorId,
    private readonly name: SensorName,
    private readonly model: SensorModel,
    private readonly unitMeasurement: SensorUnitMeasurement
  ){}

  getId(): string {
    return this.sensorId.value;
  }

  getName(): string {
    return this.name.value;
  }

  getModel(): string {
    return this.model.value;
  } 

  getUnitMeasurement(): string {
    return this.unitMeasurement.value;
  }

}