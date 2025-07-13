import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class SensorId {

  constructor(readonly value: string){
    this.ensureValueIsDefined(value);
    this.ensureValueIsUUID(value);
  }
  
  private ensureValueIsDefined(value: string): void {
    if (value === undefined || value === null || value === "") {
      throw new InvalidArgumentError("The sensor id value must be defined");
    }
  }

  private ensureValueIsUUID(value: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new InvalidArgumentError("The sensor id value does not comply with the UUID format");
    }
  }

}