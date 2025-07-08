import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/valueObjects/UserEmail_valueObject";
import { UserFirstName } from "../../domain/valueObjects/UserFirstName_valueObject";
import { UserId } from "../../domain/valueObjects/UserId_valueObject";
import { UserLastName } from "../../domain/valueObjects/UserLastName_valueObject";
import { UserPassword } from "../../domain/valueObjects/UserPassword_valueObject";
import { CreateUserDTO } from "../dtos/input/CreateUser_dto";


export class UserMapper {

  static toUser(user: CreateUserDTO): User {
    const { userId, userRole, firstName, lastName, email, password } = user;

    return new User(
      new UserId(userId),
      userRole,
      new UserFirstName(firstName),
      new UserLastName(lastName),
      new UserEmail(email),
      UserPassword.create(password)
    );

  }

}