import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class UserFirstName {
  constructor(readonly value: string){
    this.validate(value);
  }

  private validate(value: string): void {
    const sanitized = value.trim();
    this.ensureValueIsDefined(sanitized);
    this.ensureOnlyLetters(sanitized);
    this.ensureNoSQLCharacters(sanitized);
  }

  private ensureValueIsDefined(value: string): void {
    if (value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("The first name value must be defined");
    }
  }

  private ensureOnlyLetters(value: string): void {
    const lettersOnly = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
    if (!lettersOnly.test(value)) {
      throw new InvalidArgumentError("First name can only contain letters and spaces");
    }
  }

  private ensureNoSQLCharacters(value: string): void {
    const dangerousChars = /['";=\-\\\/\*\(\)<>]/;
    if (dangerousChars.test(value)) {
      throw new InvalidArgumentError("First name contains invalid characters");
    }
  }
}