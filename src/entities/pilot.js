import Motorbike from './motorbike';

export default class Pilot {
  constructor() {
    this.identifier = 0;
    this.firstName = null;
    this.lastName = null;
    this.pseudo = null;
    this.birthDate = null;
    this.registrationDate = null;
    this.driverLicenceDate = null;
    this.gender = null;
    this.email = null;
    this.phoneNumber = null;
    this.password = null;
    this.biography = null;
    this.picture = null;
    this.work = null;
    this.level = 0;
    this.blood = null;
    this.weight = null;
    this.isOrganDonor = false;
    this.hadHaveOperations = false;
    this.allergies = null;
    this.canRepairMotorbike = false;
    this.isTrainedForFirstRescue = false;
    this.hadAllreadyRideWithPassenger = false;
    this.motorbikes = [];
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new Pilot();
      for (let jsonIndex = 0; jsonIndex < Object.keys(json).length; jsonIndex += 1) {
        const jsonPropertyName = Object.keys(json)[jsonIndex];
        if (!Object.keys(entity).includes(jsonPropertyName)) {
          entity = null;
          break;
        }
      }
      if (entity !== null) {
        entity.identifier = json.identifier;
        entity.firstName = json.firstName;
        entity.lastName = json.lastName;
        entity.pseudo = json.pseudo;
        entity.birthDate = json.birthDate;
        entity.registrationDate = json.registrationDate;
        entity.driverLicenceDate = json.driverLicenceDate;
        entity.gender = json.gender;
        entity.email = json.email;
        entity.phoneNumber = json.phoneNumber;
        entity.password = json.password;
        entity.biography = json.biography;
        entity.picture = json.picture;
        entity.work = json.work;
        entity.level = json.level;
        entity.blood = json.blood;
        entity.weight = json.weight;
        entity.isOrganDonor = json.isOrganDonor;
        entity.hadHaveOperations = json.hadHaveOperations;
        entity.allergies = json.allergies;
        entity.canRepairMotorbike = json.canRepairMotorbike;
        entity.isTrainedForFirstRescue = json.isTrainedForFirstRescue;
        entity.hadAllreadyRideWithPassenger = json.hadAllreadyRideWithPassenger;
        if (json.motorbikes instanceof Array) {
          for (let index = 0; index < json.motorbikes.length; index += 1) {
            entity.motorbikes.push(Motorbike.parse(json.motorbikes[index]));
          }
        }
      }
    }
    return entity;
  }
}
