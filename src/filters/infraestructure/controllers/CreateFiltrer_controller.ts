import { Request, Response } from "express";
import { CreateFilterUseCase } from "../../application/useCases/CreateFilter_useCase";
import { CreateFilterDTO } from "../../application/dtos/input/CreateFilter_dto";
import { InvalidFilterStructureError } from "../../../shared/errors/InvalidFilterStructure_error";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";
import { FindUserByIdUseCase } from "../../../users/application/useCases/FindUserById_useCase";
import { UserNotFoundError } from "../../../shared/errors/UserNotFound_error";

export class CreateFilterController {

  constructor(
    private readonly createFilterUseCase: CreateFilterUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase
  ){}

  execute = async (req: Request, res: Response): Promise<any> => {

    const newFilterDTO = req.body as CreateFilterDTO;

    try {

      const user = await this.findUserByIdUseCase.execute(newFilterDTO.createdBy);
      const filter = await this.createFilterUseCase.execute(newFilterDTO, user);

      const jsonApiResponse = {
        data: {
          type: "filters",
          id: filter.getId(),
          attributes: {
            model: filter.getModel(),
            dateRecord: filter.getInstallationDate(),
            isActive: filter.getStatus(),
            createdAt: new Date().toISOString()
          },
          relationships: {
            creator: {
              data: {
                type: "users",
                id: user.getUserId()
              }
            },
            filterLayers: {
              data: filter.getFilterLayers().map(layer => ({
                type: "filter-layers",
                id: layer.getId()
              }))
            },
            sensors: {
              data: filter.getSensors().map(sensor => ({
                type: "sensors",
                id: sensor.getId()
              }))
            }
          }
        },
        included: [
          {
            type: "users",
            id: user.getUserId(),
            attributes: {
              name: user.getFirstName(),
              lastName: user.getLastName(),
              email: user.getEmail()
            }
          },
          ...filter.getFilterLayers().map(layer => ({
            type: "filter-layers",
            id: layer.getId(),
            attributes: {
              name: layer.getName(),
              lifeTime: layer.getLifeTime(),
              efficiency: layer.getEfficiency()
            }
          })),
          ...filter.getSensors().map(sensor => ({
            type: "sensors",
            id: sensor.getId(),
            attributes: {
              name: sensor.getName(),
              model: sensor.getModel(),
              unitMeasurement: sensor.getUnitMeasurement()
            }
          }))
        ]
      };

      return res.status(201).header('Content-Type', 'application/vnd.api+json').json(jsonApiResponse);

    } catch (err) {

      if (err instanceof InvalidArgumentError) {
        return res.status(err.statusCode).send({ err: err.message });
      }

      if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).send({ err: err.message });
      }

      if (err instanceof InvalidFilterStructureError) {
        return res.status(err.statusCode).send({ error: err.message });
      }

      if (err instanceof Error){
        return res.status(500).send({ status: "Error", message: err.message });
      }

      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });

    }


  }

}