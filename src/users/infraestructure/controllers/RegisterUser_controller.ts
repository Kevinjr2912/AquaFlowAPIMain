import { Request, Response } from "express";
import { CreateUserDTO } from "../../application/dtos/input/CreateUser_dto";
import { RegisterUserUseCase } from "../../application/useCases/RegisterUser_useCase";
import { UserMapper } from "../../application/mappers/User_mapper";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";
import { ExistingEmailError } from "../../../shared/errors/ExistingEmailError";

export class RegisterUserController {

  constructor(private readonly registerUserUseCase: RegisterUserUseCase){}

  execute = async (req: Request, res: Response): Promise<any> => {

    const userDTO = req.body as CreateUserDTO;

    try {

      const newUser = UserMapper.toUser(userDTO);
      await this.registerUserUseCase.execute(newUser);

      return res.status(201).send({ 
        data: {
          "type": "users",
          "id": newUser.getUserId(),
          "attributes": {
            "role": newUser.getUserRole(),
            "firstName": newUser.getFirstName(),
            "lastName": newUser.getLastName(),
            "email": newUser.getEmail()
          }
        }
      });

    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        return res.status(400).send({ status: "Error", message: err.message });
      }
      if (err instanceof ExistingEmailError){
        return res.status(409).send({ status: "Error", message: err.message });
      }
      if (err instanceof Error){
        return res.status(500).send({ status: "Error", message: err.message });
      }
      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });
    }

  }

}