import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class UserEmail {
  constructor(readonly value: string){
    this.ensureValueIsDefined(value);
    this.ensureIsValidEmail(value);
  }

  private ensureValueIsDefined(value: string): void {
    if(value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("The email value must be defined");
    }
  } 

  private ensureIsValidEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(value)) {
      throw new InvalidArgumentError(`${value} is not a valid email`);
    }
  }
}