import { Request, Response } from "express";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";
import { GetFiltersByUserIdUseCase } from "../../application/useCases/GetFiltersByUserId_useCase";
import { UserNotFoundError } from "../../../shared/errors/UserNotFound_error";

export class GetFiltersByUserIdController {
  constructor(private readonly getFilterByUserId: GetFiltersByUserIdUseCase) {}

  execute = async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.query;

    if (typeof userId !== "string") {
      return res.status(400).send({ message: "Missing or invalid userId in query string" });
    }

    try {
      
      const filters = await this.getFilterByUserId.execute(userId);

      const jsonApiResponse = {
        data: filters.map((filter) => ({
          type: "Filters",
          id: filter.getId(),
          attributes: {
            model: filter.getModel(),
            createBy: filter.getCreatedBy(),
            installationDate: filter.getInstallationDate(),
            userId: filter.getUserId(),
            isActive: filter.getStatus()
          },
        })),
      };

      return res.status(200).send(jsonApiResponse);

    } catch (err) {

      if (err instanceof InvalidArgumentError) {
        return res.status(err.statusCode).send({ message: err.message });
      }

      if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).send({ message: err.message });
      }

      if (err instanceof Error) {
        return res.status(500).send({ status: "Error", message: err.message });
      }

      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });

    }
  };
}
