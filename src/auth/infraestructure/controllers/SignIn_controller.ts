import { Request, Response } from "express";
import { SignInUseCase } from "../../application/useCases/SingIn_useCase";
import { UnauthorizedUserError } from "../../../shared/errors/UnauthorizedUser_error";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class SignInController {
  constructor(private readonly signUseCase: SignInUseCase) {}

  execute = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {

      const token = await this.signUseCase.execute(email, password);

      return res.status(200).json({
        data: {
          type: "authentication",
          id: "token", 
          attributes: {
            token: token 
          }
        }
      });

    } catch (err) {

      console.log(err)

      if (err instanceof InvalidArgumentError) {
        return res.status(400).send({ status: "Error", message: err.message });
      }
      if (err instanceof UnauthorizedUserError) {
        return res.status(401).send({ status: "Error", message: err.message });
      }
      if (err instanceof Error){
        return res.status(500).send({ status: "Error", message: err.message });
      }

      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });
      
    }
  };
}