import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class UserPassword {
  constructor(public value: string){
    this.ensureDefined(value);
    this.ensurePasswordHasExactLength(value);
    this.ensurePasswordHasRequiredCharacters(value);
  }

  private ensureDefined(value: string): void {
    if (value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("Password must be defined");
    }
  }

  private ensurePasswordHasExactLength(password: string): void {
    if (password.length !== 8) {
      throw new InvalidArgumentError("Password must be exactly 8 characters long");
    }
  }

   private ensurePasswordHasRequiredCharacters(password: string): void {
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsDigit = /\d/.test(password);
    const containsSpecialCharacter = /[!@#$%^&*(),.?":{}|<>_\-\\[\]~`+=/]/.test(password);

    if (!containsUppercase) throw new InvalidArgumentError("Password must include at least one uppercase letter");
    
    if (!containsLowercase) throw new InvalidArgumentError("Password must include at least one lowercase letter");
    
    if (!containsDigit) throw new InvalidArgumentError("Password must include at least one number");
    
    if (!containsSpecialCharacter) throw new InvalidArgumentError("Password must include at least one special character");
    
  }





}