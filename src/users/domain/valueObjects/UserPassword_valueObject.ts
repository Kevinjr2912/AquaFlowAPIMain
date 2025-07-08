import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class UserPassword {
  constructor(public value: string){}

  static create (passwordPlain: string): UserPassword {
    this.ensureDefined(passwordPlain);
    this.ensurePasswordHasExactLength(passwordPlain);
    this.ensurePasswordHasRequiredCharacters(passwordPlain);

    return new UserPassword(passwordPlain);
  }

  static fromHashed (hashedPassword: string): UserPassword {
    return new UserPassword(hashedPassword);
  }

  private static ensureDefined(value: string): void {
    if (value === null || value === undefined || value === "") {
      throw new InvalidArgumentError("Password must be defined");
    }
  }

  private static ensurePasswordHasExactLength(password: string): void {
    if (password.length !== 8) {
      throw new InvalidArgumentError("Password must be exactly 8 characters long");
    }
  }

   private static ensurePasswordHasRequiredCharacters(password: string): void {
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