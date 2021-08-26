export default class Activity {
  constructor() {
    this.identifier = 0;
    this.date = null;
    this.event = null;
    this.pseudo = null;
    this.detail = null;
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new Activity();
      for (let jsonIndex = 0; jsonIndex < Object.keys(json).length; jsonIndex += 1) {
        const jsonPropertyName = Object.keys(json)[jsonIndex];
        if (!Object.keys(entity).includes(jsonPropertyName)) {
          entity = null;
          break;
        }
      }
      if (entity !== null) {
        entity.identifier = json.identifier;
        entity.date = new Date(json.date);
        entity.event = json.event;
        entity.pseudo = json.pseudo;
        entity.detail = json.detail;
      }
    }
    return entity;
  }
}
