import Reservation from "./reservation";
// import RoadTrip from "./roadtrip";
export default class Biker {
  constructor() {
    this.identifier = 0;
    this.firstName = null;
    this.lastName = null;
    this.pseudo = null;
    this.birthDate = new Date();
    this.registrationDate = new Date();
    this.driverLicenceDate = null;
    this.gender = null;
    this.email = null;
    this.address = null;
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
    // this.motorbikes = [];
    this.reservations = [];
  }

  static parse(json) {
    let entity = null;
    if (json && json instanceof Object) {
      entity = new Biker();
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
        entity.birthDate = new Date(json.birthDate);
        entity.registrationDate = new Date(json.registrationDate);
        entity.driverLicenceDate = new Date(json.driverLicenceDate);
        entity.gender = json.gender;
        entity.email = json.email;
        entity.phoneNumber = json.phoneNumber;
        entity.password = json.password;
        entity.biography = json.biography;
        entity.picture = json.picture;
        entity.work = json.work;
        entity.address = json.address;
        entity.level = json.level;
        entity.blood = json.blood;
        entity.weight = json.weight;
        entity.isOrganDonor = json.isOrganDonor;
        entity.hadHaveOperations = json.hadHaveOperations;
        entity.allergies = json.allergies;
        entity.canRepairMotorbike = json.canRepairMotorbike;
        entity.isTrainedForFirstRescue = json.isTrainedForFirstRescue;
        entity.hadAllreadyRideWithPassenger = json.hadAllreadyRideWithPassenger;
        // if (json.motorbikes instanceof Array) {
        //   for (let index = 0; index < json.motorbikes.length; index += 1) {
        //     entity.motorbikes.push(Motorbike.parse(json.motorbikes[index]));
        //   }
        // }
        if (json.reservations instanceof Array) {
          for (let index = 0; index < json.reservations.length; index += 1) {
            entity.reservations.push(Reservation.parse(json.reservations[index]));
          }
        }
      }
    }
    return entity;
  }
}
