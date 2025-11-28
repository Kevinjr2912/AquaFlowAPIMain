import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class UserLastName {
  constructor(readonly value: string) {
    this.validate(value);
  }

  private validate(value: string): void {
    const sanitized = value.trim();
    this.ensureDefined(sanitized);
    this.ensureTwoSurnames(sanitized);
    this.ensureOnlyLetters(sanitized);
    this.ensureNoSQLCharacters(sanitized);
  }

  private ensureDefined(value: string): void {
    if (value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("Last name must be defined");
    }
  }

  private ensureTwoSurnames(value: string): void {
    const surnameParts = value.split(/\s+/);
    if (surnameParts.length !== 2) {
      throw new InvalidArgumentError("Last name must include exactly two surnames: paternal and maternal");
    }
  }

  private ensureOnlyLetters(value: string): void {
    const surnameParts = value.split(/\s+/);
    const lettersOnly = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/;

    for (const surname of surnameParts) {
      if (!lettersOnly.test(surname)) {
        throw new InvalidArgumentError(`"${surname}" is not valid. Only letters are allowed`);
      }
    }
  }

  private ensureNoSQLCharacters(value: string): void {
    const dangerousChars = /['";=\-\\\/\*\(\)<>]/;
    if (dangerousChars.test(value)) {
      throw new InvalidArgumentError("Last name contains invalid characters");
    }
  }
}