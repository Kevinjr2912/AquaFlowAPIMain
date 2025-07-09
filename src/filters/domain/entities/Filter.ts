import { UserId } from "../../../users/domain/valueObjects/UserId_valueObject";
import { FilterCreatedBy } from "../valueObjects/filter/FilterCreatedBy_valueObject";
import { FilterDateRecord } from "../valueObjects/filter/FilterDateRecord_valueObject";
import { FilterId } from "../valueObjects/filter/FilterId_valueObject";
import { FilterModel } from "../valueObjects/filter/FilterModel_valueObject";
import { FilterName } from "../valueObjects/filter/FilterName_valueObject";
import { FilterStatus } from "../valueObjects/filter/FilterStatus_valueObject";
import { FilterLayer } from "./FilterLayer";
import { Sensor } from "./Sensor";

export class Filter {
  
  private userId: UserId | null = null;
  private filterLayers: FilterLayer[] = [];
  private sensors: Sensor[] = [];

  constructor(
    private readonly filterId: FilterId,
    private readonly createdBy: FilterCreatedBy,
    private readonly name: FilterName,
    private readonly model: FilterModel,
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

  getUserId(): string | null {
    return this.userId ? this.userId.value : null;
  }
  
  getCreatedBy(): string {
    return this.createdBy.value;
  }

  getName(): string {
    return this.name.value;
  }

  getModel(): string {
    return this.model.value;
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

  addFilterLayer(filterLayer: FilterLayer): void {
    this.filterLayers.push(filterLayer);
  }

  addSensors(sensor: Sensor): void {
    this.sensors.push(sensor);
  }

}