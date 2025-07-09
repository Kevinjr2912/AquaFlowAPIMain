import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class FilterName {
  constructor(readonly value: string) {
    this.ensureValueIsDefined(value);
    this.ensureLengthIsValid(value);
  }

  private ensureValueIsDefined(value: string): void {
    if (value === undefined || value === null || value === "") {
      throw new InvalidArgumentError("Filter name must be defined");
    }
  }

  private ensureLengthIsValid(value: string): void {
    if (value.length < 3 || value.length > 30) {
      throw new InvalidArgumentError("Filter name must be between 3 and 30 characters long");
    }
  }
}
