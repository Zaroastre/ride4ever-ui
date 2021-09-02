import axios from 'axios';
import Reservation from '../entities/reservation';
import AbstractService from './abstractService';

export default class ReservationService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/reservations');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  create(reservation) {
    return new Promise((resolve, reject) => {
      if (reservation instanceof Reservation) {
        axios.post(this.url, reservation, { headers: this.headers })
          .then((response) => {
            resolve(Reservation.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'reservation\'.');
      }
    });
  }

  update(identifier, entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Reservation) {
        axios.put(String(this.url).concat('/').concat(identifier), entity, { headers: this.headers })
          .then((response) => {
            resolve(Reservation.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'reservation\'.');
      }
    });
  }

  findReservations(filters = null) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url), { headers: this.headers, params: filters })
        .then((response) => {
          const reservations = [];
          if (Array.isArray(response.data)) {
            for (let index = 0; index < response.data.length; index += 1) {
              reservations.push(Reservation.parse(response.data[index]));
            }
          } else {
            reservations.push(Reservation.parse(response.data));
          }
          resolve(reservations);
        })
        .catch((exception) => {
          if (exception.response === undefined) {
            reject('Server is unreachable.');
          } else {
            reject(exception.response.data.error);
          }
        });
    });
  }

  findById(identifier) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/').concat(identifier), { headers: this.headers })
        .then((response) => {
          const reservation = Reservation.parse(response.data);
          resolve(reservation);
        })
        .catch((exception) => {
          if (exception.response === undefined) {
            reject('Server is unreachable.');
          } else {
            reject(exception.response.data.error);
          }
        });
    });
  }

  delete(reservation) {
    return new Promise((resolve, reject) => {
      if (reservation instanceof Reservation) {
        axios.delete(String(this.url).concat('/').concat(reservation.identifier), { headers: this.headers })
          .then(() => {
            resolve();
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'reservation\'.');
      }
    });
  }
}
