import { InvalidArgumentError } from "../../../../shared/errors/InvalidArgument_error";

export enum TypeFilterLayer {
  NaturalZeoltes = "Natural zeolites",
  FarInfraredBall = "Far Infrared Ball",
  SiliconSand = "Silicon sand",
  MineralSand = "Mineral sand",
  TDS = "TDS",
}

export class FilterLayerName {

  constructor(readonly value: TypeFilterLayer) {
    this.ensureValueIsDefined(value);
    this.isTypeSensorName(value);
  }

  ensureValueIsDefined(value: TypeFilterLayer): void {
    if (value === undefined || value === null) {
      throw new InvalidArgumentError("The filter layer name value must be defined");
    }
  }

  isTypeSensorName(value: TypeFilterLayer): void {
    if (!Object.values(TypeFilterLayer).includes(value)) {
      throw new InvalidArgumentError(
        "The value must correspond to the type filter name"
      );
    }
  }

}
