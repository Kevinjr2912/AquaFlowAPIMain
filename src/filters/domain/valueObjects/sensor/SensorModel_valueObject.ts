import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class SensorModel {

  constructor(readonly value: string){
    this.ensureValueIsDefined(this.value);
  }

  private ensureValueIsDefined(value: string): void {
    if (value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("The sensor model value must be defined");
    }
  }

}