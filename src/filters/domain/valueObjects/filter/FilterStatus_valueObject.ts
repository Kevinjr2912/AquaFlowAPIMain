import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class FilterStatus {
  constructor(public value: boolean) {
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: boolean): void {
    if (typeof value !== "boolean") {
      throw new InvalidArgumentError("Filter status must be a boolean value");
    }
  }
}
