import { FilterId } from "../valueObjects/filter/FilterId_valueObject";
import { FilterModel } from "../valueObjects/filter/FilterModel_valueObject";
import { FilterName } from "../valueObjects/filter/FilterName_valueObject";
import { FilterStatus } from "../valueObjects/filter/FilterStatus_valueObject";
import { FilterLayer } from "./FilterLayer";
import { Sensor } from "./Sensor";

export class Filter {
  
  private filterLayers: FilterLayer[] = [];
  private sensors: Sensor[] = [];

  constructor(
    private readonly filterId: FilterId,
    private readonly name: FilterName,
    private readonly model: FilterModel,
    private readonly installationDate: Date,
    private readonly isActive: FilterStatus,
  ){}

  getId(): string {
    return this.filterId.value;
  }

  getName(): string {
    return this.name.value;
  }

  getModel(): string {
    return this.model.value;
  }

  getInstallationDate(): Date {
    return this.installationDate;
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