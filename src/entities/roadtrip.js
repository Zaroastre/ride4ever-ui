import Address from "./address";
import Biker from "./biker";

export default class RoadTrip {
  constructor() {
    this.identifier = 0;
    this.title = null;
    this.description = null;
    this.organizer = null;
    this.maxBikers = 1;
    this.candidates = [];
    this.bikers = [];
    this.roadTripType = null;
    this.startDate = new Date();
    this.endDate = this.startDate;
    this.status = null;
    this.destinations = [];
    this.startAddress = null;
    this.stopAddress = null;
    this.kilometersAverage = 0;
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new RoadTrip();
      for (let jsonIndex = 0; jsonIndex < Object.keys(json).length; jsonIndex += 1) {
        const jsonPropertyName = Object.keys(json)[jsonIndex];
        if (!Object.keys(entity).includes(jsonPropertyName)) {
          entity = null;
          break;
        }
      }
      if (entity !== null) {
        entity.identifier = json.identifier;
        entity.title = json.title;
        entity.description = json.description;
        entity.organizer = Biker.parse(json.organizer);
        entity.maxBikers = json.maxBikers;
        entity.candidates = json.candidates;
        entity.bikers = json.bikers;
        entity.roadTripType = json.roadTripType;
        entity.status = json.status;
        entity.startDate = new Date(json.startDate);
        entity.endDate = new Date(json.endDate);
        entity.startAddress = Address.parse(json.startAddress);
        entity.destinations = json.destinations;
        entity.stopAddress = Address.parse(json.stopAddress);
        entity.kilometersAverage = json.kilometersAverage;
      }
    }
    return entity;
  }
}
