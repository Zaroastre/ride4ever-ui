import Biker from "./biker";

export default class Motorbike {
  constructor() {
    this.identifier = 0;
    this.brand = null;
    this.model = null;
    this.engineDisplacement = 0;
    this.year = 0;

    this.type = null;
    this.color = null;
    this.fuelTankSize = 0;
    this.mileage = 0;

    this.licensePlate = null;
    this.isRestrained = false;
    this.biker = null;

    this.picture = null;
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new Motorbike();
      for (let jsonIndex = 0; jsonIndex < Object.keys(json).length; jsonIndex += 1) {
        const jsonPropertyName = Object.keys(json)[jsonIndex];
        if (!Object.keys(entity).includes(jsonPropertyName)) {
          entity = null;
          break;
        }
      }
      if (entity !== null) {
        entity.identifier = json.identifier;
        entity.licensePlate = json.licensePlate;
        entity.mileage = json.mileage;
        entity.brand = json.brand;
        entity.model = json.model;
        entity.color = json.color;
        entity.engineDisplacement = json.engineDisplacement;
        entity.year = json.year;
        entity.fuelTankSize = json.fuelTankSize;
        entity.type = json.type;
        entity.biker = Biker.parse(json.biker);
        entity.isRestrained = json.isRestrained;
        entity.picture = json.picture;
      }
    }
    return entity;
  }
}
