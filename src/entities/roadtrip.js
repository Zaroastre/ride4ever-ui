export default class RoadTrip {
  constructor() {
    this.identifier = 0;
    this.title = null;
    this.description = null;
    this.organizer = null;
    this.maxPilots = 0;
    this.candidates = [];
    this.pilots = [];
    this.roadTripType = null;
    this.startDate = null;
    this.endDate = null;
    this.startPlace = false;
    this.stopPlace = null;
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
        entity.organizer = json.organizer;
        entity.maxPilots = json.maxPilots;
        entity.candidates = json.candidates;
        entity.pilots = json.pilots;
        entity.roadTripType = json.roadTripType;
        entity.startDate = json.startDate;
        entity.endDate = json.endDate;
        entity.startPlace = json.startPlace;
        entity.stopPlace = json.stopPlace;
        entity.kilometersAverage = json.kilometersAverage;
      }
    }
    return entity;
  }
}
