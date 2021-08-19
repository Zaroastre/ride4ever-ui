export default class Motorbike {
  constructor() {
    this.identifier = 0;
    this.licensePlate = null;
    this.mileage = null;
    this.brand = null;
    this.model = null;
    this.engineDisplacement = null;
    this.year = null;
    this.fuelTankSize = null;
    this.type = null;
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
        entity.engineDisplacement = json.engineDisplacement;
        entity.year = json.year;
        entity.fuelTankSize = json.fuelTankSize;
        entity.type = json.type;
      }
    }
    return entity;
  }
}
