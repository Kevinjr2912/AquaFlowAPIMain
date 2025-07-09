import { FilterLayerEfficiency } from "../valueObjects/filterLayer/FilterLayerEfficiency_valueObject";
import { FilterLayerId } from "../valueObjects/filterLayer/FilterLayerId_valueObject";
import { FilterLayerLifeTime } from "../valueObjects/filterLayer/FilterLayerLifeTime_valueObject";
import { FilterLayerName } from "../valueObjects/filterLayer/FilterLayerName_valueObject";

export class FilterLayer {
  constructor(
    private readonly filterLayerId: FilterLayerId,
    private readonly name: FilterLayerName,
    private readonly lifeTime: FilterLayerLifeTime,
    private readonly efficiency: FilterLayerEfficiency
  ){}

  getId(): string {
    return this.filterLayerId.value;
  }

  getName(): string {
    return this.name.value;
  }

  getLifeTime(): number {
    return this.lifeTime.value;
  }

  getEfficiency(): number {
    return this.efficiency.value;
  }
  
}