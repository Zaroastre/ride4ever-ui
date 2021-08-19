import Pilot from './pilot';

export default class Session {
  constructor() {
    this.pilot = null;
    this.jwt = null;
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new Session();
      for (let jsonIndex = 0; jsonIndex < Object.keys(json).length; jsonIndex += 1) {
        const jsonPropertyName = Object.keys(json)[jsonIndex];
        if (!Object.keys(entity).includes(jsonPropertyName)) {
          entity = null;
          break;
        }
      }
      if (entity !== null) {
        entity = new Session();
        entity.pilot = Pilot.parse(json.pilot);
        entity.jwt = json.jwt;
      }
    }
    return entity;
  }
}
