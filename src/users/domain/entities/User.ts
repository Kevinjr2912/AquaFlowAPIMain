import { UserEmail } from "../valueObjects/UserEmail_valueObject";
import { UserFilterId } from "../valueObjects/UserFilterId_valueObject";
import { UserFirstName } from "../valueObjects/UserFirstName_valueObject";
import { UserId } from "../valueObjects/UserId_valueObject";
import { UserLastName } from "../valueObjects/UserLastName_valueObject";
import { UserPassword } from "../valueObjects/UserPassword_valueObject";

export class User {

  constructor(
    private readonly userId: UserId,
    private readonly firstName: UserFirstName,
    private readonly lastName: UserLastName,
    private readonly email: UserEmail,
    private readonly password: UserPassword,
    private readonly filtersId?: UserFilterId []
  ){}

  getUserId(): string {
    return this.userId.value;
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
  
  getFiltersId(): string [] {
    return this.filtersId?.filter(f => f.value).map(f => f.value) ?? [];
  }

}