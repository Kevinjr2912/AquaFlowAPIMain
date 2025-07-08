import { UserEmail } from "../valueObjects/UserEmail_valueObject";
import { UserFirstName } from "../valueObjects/UserFirstName_valueObject";
import { UserId } from "../valueObjects/UserId_valueObject";
import { UserLastName } from "../valueObjects/UserLastName_valueObject";
import { UserPassword } from "../valueObjects/UserPassword_valueObject";

export enum UserRole {
  regularUser = 'Regular user',
  administrator = 'Administrator'
}

export class User {

  constructor(
    private readonly userId: UserId,
    private readonly userRole: UserRole,
    private readonly firstName: UserFirstName,
    private readonly lastName: UserLastName,
    private readonly email: UserEmail,
    private readonly password: UserPassword
  ){}

  getUserId(): string {
    return this.userId.value;
  }

  getUserRole(): UserRole {
    return this.userRole;
  }

  getFirstName(): string {
    return this.firstName.value;
  }

  getLastName(): string {
    return this.lastName.value;
  }

  getEmail(): string {
    return this.email.value;
  }

  getPassword(): string {
    return this.password.value;
  }

  setPassword(passwordHashed: string): void {
    this.password.value = passwordHashed;
  }
  
}