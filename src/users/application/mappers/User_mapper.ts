import { User } from "src/users/domain/entities/User";
import { CreateUserDTO } from "../dtos/input/CreateUser_dto";
import { UserId } from "src/users/domain/valueObjects/UserId_valueObject";
import { UserFirstName } from "src/users/domain/valueObjects/UserFirstName_valueObject";
import { UserLastName } from "src/users/domain/valueObjects/UserLastName_valueObject";
import { UserEmail } from "src/users/domain/valueObjects/UserEmail_valueObject";
import { UserPassword } from "src/users/domain/valueObjects/UserPassword_valueObject";

export class UserMapper {

  static toUser(user: CreateUserDTO): User {
    const { userId, userRole, firstName, lastName, email, password } = user;

    return new User(
      new UserId(userId),
      userRole,
      new UserFirstName(firstName),
      new UserLastName(lastName),
      new UserEmail(email),
      new UserPassword(password)
    );

  }

}