import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class FilterLayerEfficiency {
  constructor(readonly value: number) {
    this.ensureValueIsValid(value);
  }

  private ensureValueIsValid(value: number): void {
    if (value === undefined || value === null || isNaN(value)) {
      throw new InvalidArgumentError("The filter layer efficiency must be a valid number");
    }

    if (value < 0 || value > 100) {
      throw new InvalidArgumentError("The filter layer efficiency must be between 0 and 100");
    }
  }
}
