import Biker from './biker';

export default class Session {
  constructor() {
    this.biker = null;
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
        entity.biker = Biker.parse(json.biker);
        entity.jwt = json.jwt;
      }
    }
    return entity;
  }
}
