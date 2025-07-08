import { Request, Response } from "express";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";
import { ExistingEmailError } from "../../../shared/errors/ExistingEmailError";
import { SignUpUseCase } from "../../application/useCases/SignUp_useCase";
import { CreateUserDTO } from "../../../users/application/dtos/input/CreateUser_dto";
import { UserMapper } from "../../../users/application/mappers/User_mapper";

export class SignUpController {

  constructor(private readonly signUpUseCase: SignUpUseCase){}

  execute = async (req: Request, res: Response): Promise<any> => {

    const userDTO = req.body as CreateUserDTO;

    try {

      const newUser = UserMapper.toUser(userDTO);
      await this.signUpUseCase.execute(newUser);

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