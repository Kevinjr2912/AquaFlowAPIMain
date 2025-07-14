import { Request, Response } from "express";
import { GetAllFiltersUseCase } from "../../application/useCases/GetAllFilters_useCase";

export class GetAllFiltersController {
  constructor (private readonly getAllFilterUseCase: GetAllFiltersUseCase){}

  execute = async (req: Request, res: Response): Promise<any> => {

    try {
      
      const filters = await this.getAllFilterUseCase.execute();

      return res.status(200).json({
        data: filters.map(filter => ({
          type: "filters",
          id: filter.filterId,
          attributes: {
            model: filter.model,
            createBy: filter.createBy,
            isActive: filter.isActive,
            createdAt: filter.createdAt
          }
        }))
      });

    } catch (err) {

      if (err instanceof Error){
        return res.status(500).send({ status: "Error", message: err.message });
      }

      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });

    }

  }

}