import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export enum TypeSensorName {
  Ph = 'Ph',
  Turbidity = 'Turbidity',
  Temperature = 'Temperature',
  TDS = 'TDS'
}

export class SensorName {

  constructor(readonly value: TypeSensorName ) {
    this.ensureValueIsDefined(value);
    this.isTypeSensorName(value);
  }

  ensureValueIsDefined(value: TypeSensorName): void {
    if (value === undefined || value === null) {
      throw new InvalidArgumentError("The sensor name value must be defined");
    }
  }

  isTypeSensorName(value: TypeSensorName): void {
    if (!Object.values(TypeSensorName).includes(value)){
      throw new InvalidArgumentError("The value must correspond to the type sensor name");
    }
  }

}