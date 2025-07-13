import { Filter } from "../../domain/entities/Filter";
import { FilterCreatedBy } from "../../domain/valueObjects/filter/FilterCreatedBy_valueObject";
import { FilterDateRecord } from "../../domain/valueObjects/filter/FilterDateRecord_valueObject";
import { FilterId } from "../../domain/valueObjects/filter/FilterId_valueObject";
import { FilterModel } from "../../domain/valueObjects/filter/FilterModel_valueObject";
import { FilterStatus } from "../../domain/valueObjects/filter/FilterStatus_valueObject";
import { CreateFilterDTO } from "../dtos/input/CreateFilter_dto";

export class FilterMapper {

  static toFilter({ filterId, createdBy, model, dateRecord, isActive }: CreateFilterDTO): Filter {
    return new Filter(
      new FilterId(filterId),
      new FilterModel(model),
      new FilterCreatedBy(createdBy),
      new FilterDateRecord(new Date(dateRecord)),
      new FilterStatus(isActive)
    )
  }

}