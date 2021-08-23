export default class Place {
  constructor() {
    this.identifier = 0;
    this.number = 0;
    this.street = null;
    this.zipCode = 0;
    this.city = null;
    this.country = null;
    this.weather = null;
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new Place();
      for (let jsonIndex = 0; jsonIndex < Object.keys(json).length; jsonIndex += 1) {
        const jsonPropertyName = Object.keys(json)[jsonIndex];
        if (!Object.keys(entity).includes(jsonPropertyName)) {
          entity = null;
          break;
        }
      }
      if (entity !== null) {
        entity.identifier = json.identifier;
        entity.number = json.number;
        entity.street = json.street;
        entity.zipCode = json.zipCode;
        entity.city = json.city;
        entity.country = json.country;
        entity.weather = json.weather;
      }
    }
    return entity;
  }
}