import { UserId } from "../../../users/domain/valueObjects/UserId_valueObject";
import { Filter } from "../../domain/entities/Filter";
import { FilterCreatedBy } from "../../domain/valueObjects/filter/FilterCreatedBy_valueObject";
import { FilterDateRecord } from "../../domain/valueObjects/filter/FilterDateRecord_valueObject";
import { FilterId } from "../../domain/valueObjects/filter/FilterId_valueObject";
import { FilterModel } from "../../domain/valueObjects/filter/FilterModel_valueObject";
import { FilterStatus } from "../../domain/valueObjects/filter/FilterStatus_valueObject";
import { CreateFilterDTO } from "../dtos/input/CreateFilter_dto";
import { FilterDTO } from '../dtos/output/Filter_dto';

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

  static toFilterDTO(rows: any[]): FilterDTO[] {
    return rows.map((row) => ({
      filterId: row.filter_id,
      model: row.name_device_model,
      createBy: `${row.first_name} ${row.first_surname} ${row.middle_surname}`,
      isActive: row.is_active,
      createdAt: new Date(row.created_at)
    }));
  }

  static toFilterFromDB(row: any): Filter {
    
    const filter = new Filter(
      new FilterId(row.filter_id),
      new FilterModel(row.name_device_model),
      new FilterCreatedBy(row.created_by),
      new FilterDateRecord(new Date(row.created_at)),
      new FilterStatus(row.is_active)
    );

    if (row.user_id) filter.assignToUser(new UserId(row.user_id));

    return filter;

  }

  
  static toFiltersFromDB(rows: any[]): Filter[] {
    return rows.map((row) => {
      const filter = new Filter(
        new FilterId(row.filter_id),
        new FilterModel(row.name_device_model),
        new FilterCreatedBy(row.created_by),
        new FilterDateRecord(new Date(row.created_at)),
        new FilterStatus(row.is_active)
      );

      if (row.user_id) {
        filter.setUserId(row.user_id);
      }

      return filter;
    });
  }


}