import { UserRole } from "../../../domain/entities/User";

export interface CreateUserDTO {
  userId: string,
  userRole: UserRole,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}