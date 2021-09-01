import Biker from "./biker";
import RoadTrip from "./roadtrip";

export default class Reservation {
  constructor() {
    this.identifier = 0;
    this.biker = null;
    this.roadTrip = null;
    this.date = new Date();
    this.status = null;
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new Reservation();
      for (let jsonIndex = 0; jsonIndex < Object.keys(json).length; jsonIndex += 1) {
        const jsonPropertyName = Object.keys(json)[jsonIndex];
        if (!Object.keys(entity).includes(jsonPropertyName)) {
          entity = null;
          break;
        }
      }
      if (entity !== null) {
        entity.identifier = json.identifier;
        entity.biker = Biker.parse(json.biker);
        entity.roadTrip = RoadTrip.parse(json.roadTrip);
        entity.date = new Date(json.date);
        entity.status = json.status;
      }
    }
    return entity;
  }
}
