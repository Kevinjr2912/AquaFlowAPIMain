import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export class FilterCreatedBy {

  constructor(readonly value: string){
    this.ensureValueIsDefined(value);
    this.ensureValueIsUUID(value);
  }
  
  private ensureValueIsDefined(value: string): void {
    if (value === undefined || value === null || value === "") {
      throw new InvalidArgumentError("The id of the person who created the filter must be defined");
    }
  }

  private ensureValueIsUUID(value: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new InvalidArgumentError("The id of the person who created the filter does not comply with the UUID format");
    }
  }

}