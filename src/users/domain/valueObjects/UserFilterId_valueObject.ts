import { InvalidArgumentError } from "src/shared/errors/InvalidArgument_error";

export class UserFilterId {
  constructor(readonly value: string){
    this.ensureValueIsDefined(value);
    this.ensureValueIsUUID(value);
  }

  private ensureValueIsDefined(value: string): void {
    if(value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("The id value must be defined");
    }
  }

  private ensureValueIsUUID(value: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new InvalidArgumentError("The id value does not comply with the UUID format");
    }
  }

} 