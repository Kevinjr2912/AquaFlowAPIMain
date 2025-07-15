import { Request, Response } from "express";
import { AssociateFilterToUserUseCase } from "../../application/useCases/AssociateFilterToUser_useCase";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";
import { UserNotFoundError } from "../../../shared/errors/UserNotFound_error";
import { FilterNotFoundError } from "../../../shared/errors/FilterNotFound_error";
import { FilterAlreadyAssignedError } from "../../../shared/errors/FilterAlreadyAssigned_error";

export class AssociateFilterToUserController {
  constructor(private readonly associateFilter: AssociateFilterToUserUseCase){}

  execute = async (req: Request, res: Response): Promise<any> => {
    const { filterId } = req.params;
    const { userId } = req.body;

    try {
      
      const filter = await this.associateFilter.execute(userId, filterId);
      
      const jsonApiResponse = {
        data: {
          type: "Filters",
          id: filter.getId(),
          attributes: {
            model: filter.getModel(),
            createBy: filter.getCreatedBy(),
            installationDate: filter.getInstallationDate(),
            userId: filter.getUserId(),
            isActive: filter.getStatus()
          }
        }
      }

      return res.status(200).send(jsonApiResponse);

    } catch (err) {

      if (err instanceof InvalidArgumentError) {
        return res.status(err.statusCode).send({ message: err.message });
      }

      if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).send({ message: err.message });
      }

      if (err instanceof FilterNotFoundError) {
        return res.status(err.statusCode).send({ message: err.message });
      }

      if (err instanceof FilterAlreadyAssignedError) {
        return res.status(err.statusCode).send({ message: err.message });
      }

      if (err instanceof Error){
        return res.status(500).send({ status: "Error", message: err.message });
      }

      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });

    }

  }

}