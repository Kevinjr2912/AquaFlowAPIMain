import { InvalidArgumentError } from "src/shared/errors/InvalidArgument_error";

export class UserFirstName {
  constructor(readonly value: string){
    this.ensureValueIsDefined(this.value);
  }

  private ensureValueIsDefined(value: string): void {
    if (value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("The first name value must be defined");
    }
  }
}