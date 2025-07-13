import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class FilterModel {
  constructor(readonly value: string) {
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: string): void {
    if (value === undefined || value === null || value === "") {
      throw new InvalidArgumentError("The filter model value must be defined");
    }
  }

}
