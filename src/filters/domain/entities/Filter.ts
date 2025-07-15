import { ExistingSensorError } from "../../../shared/errors/ExistingSensor_error";
import { InvalidFilterStructureError } from "../../../shared/errors/InvalidFilterStructure_error";
import { UserId } from "../../../users/domain/valueObjects/UserId_valueObject";
import { FilterCreatedBy } from "../valueObjects/filter/FilterCreatedBy_valueObject";
import { FilterDateRecord } from "../valueObjects/filter/FilterDateRecord_valueObject";
import { FilterId } from "../valueObjects/filter/FilterId_valueObject";
import { FilterModel } from "../valueObjects/filter/FilterModel_valueObject";
import { FilterStatus } from "../valueObjects/filter/FilterStatus_valueObject";
import { FilterLayer } from "./FilterLayer";
import { Sensor } from "./Sensor";

export class Filter {
  
  private userId: UserId | null = null;
  private filterLayers: FilterLayer[] = [];
  private sensors: Sensor[] = [];

  constructor(
    private readonly filterId: FilterId,
    private readonly model: FilterModel,
    private readonly createdBy: FilterCreatedBy,
    private readonly dateRecord: FilterDateRecord,
    private isActive: FilterStatus,
  ){}

  assignToUser(userId: UserId) {
    this.userId = userId;
    this.isActive.value = true;
  }

  getId(): string {
    return this.filterId.value;
  }

  getModel(): string {
    return this.model.value;
  }

  getUserId(): string | null {
    return this.userId ? this.userId.value : null;
  }

  setUserId(userId: string) {
  this.userId = new UserId(userId);
  }
  
  getCreatedBy(): string {
    return this.createdBy.value;
  }

  getInstallationDate(): Date {
    return this.dateRecord.value;
  }

  getStatus(): boolean {
    return this.isActive.value;
  }

  getFilterLayers(): FilterLayer[] {
    return this.filterLayers;
  }

  getSensors(): Sensor[] {
    return this.sensors;
  }

  addFilterLayers(filterLayers: FilterLayer[]): void {
    filterLayers.forEach(filterLayer => {
      if (this.filterLayers.includes(filterLayer)) {
        throw new ExistingSensorError("You cannot add the same type of filter layer to the filter");
      }
      
      this.filterLayers.push(filterLayer);
    });
  }

  addSensors(sensors: Sensor[]): void {
    sensors.forEach(sensor => {
      if (this.sensors.includes(sensor)) {
        throw new ExistingSensorError("You cannot add the same type of sensor to the filter");
      }

      this.sensors.push(sensor);
    });
  }

  validateStructure(): void {
    if (this.sensors.length !== 4) {
      throw new InvalidFilterStructureError("Filter must have 4 sensors");
    }

    if (this.filterLayers.length !== 5) {
      throw new InvalidFilterStructureError("Filter must have 5 layers");
    }
  }

}