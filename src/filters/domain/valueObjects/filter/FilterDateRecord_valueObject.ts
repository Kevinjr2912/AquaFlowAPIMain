import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class FilterDateRecord {
  constructor(readonly value: Date) {
    this.ensureValueIsDefined(value);
    this.ensureDateIsValid(value);
  }

  private ensureValueIsDefined(value: Date): void {
    if (value === undefined || value === null || !(value instanceof Date)) {
      throw new InvalidArgumentError("Record date must be a valid Date object");
    }
  }

  private ensureDateIsValid(value: Date): void {
    if (value.getTime() > new Date().getTime()) {
      throw new InvalidArgumentError("Record date cannot be in the future");
    }
  }
}
