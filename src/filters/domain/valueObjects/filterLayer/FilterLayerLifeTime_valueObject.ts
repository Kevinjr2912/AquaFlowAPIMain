import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class FilterLayerLifeTime {
  constructor(readonly value: number) {
    this.ensureValueIsValid(value);
  }

  private ensureValueIsValid(value: number): void {
    if (value === undefined || value === null || isNaN(value)) {
      throw new InvalidArgumentError("The filter layer lifetime must be a valid number");
    }

    if (value <= 0) {
      throw new InvalidArgumentError("The filter layer lifetime must be greater than 0");
    }
  }
}
