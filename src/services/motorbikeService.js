import axios from 'axios';
import Motorbike from '../entities/motorbike';
import AbstractService from './abstractService';

export default class MotorbikeService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/motorbikes');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  create(entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Motorbike) {
        axios.post(String(this.url), entity, { headers: this.headers })
          .then((response) => {
            resolve(Motorbike.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject(new Error('Server is unreachable.'));
            } else {
              reject(exception.response);
            }
          });
      } else {
        reject(new Error('Invalid data type for parameter \'credential\'.'));
      }
    });
  }

  update(identifier, entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Motorbike) {
        axios.put(String(this.url).concat('/').concat(identifier), entity, { headers: this.headers })
          .then((response) => {
            resolve(Motorbike.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject(new Error('Server is unreachable.'));
            } else {
              reject(exception.response);
            }
          });
      } else {
        reject(new Error('Invalid data type for parameter \'credential\'.'));
      }
    });
  }

  getMotorbikesTypes() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/types'), { headers: this.headers })
        .then((response) => {
          resolve(response.data);
        })
        .catch((exception) => {
          if (exception.response === undefined) {
            reject(new Error('Server is unreachable.'));
          } else {
            reject(exception.response);
          }
        });
    });
  }

  getBrands() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/brands'), { headers: this.headers })
        .then((response) => {
          resolve(response.data);
        })
        .catch((exception) => {
          if (exception.response === undefined) {
            reject(new Error('Server is unreachable.'));
          } else {
            reject(exception.response);
          }
        });
    });
  }

  delete(entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Motorbike) {
        axios.delete(String(this.url).concat('/').concat(entity.identifier), entity, { headers: this.headers })
          .then(() => {
            resolve();
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject(new Error('Server is unreachable.'));
            } else {
              reject(exception.response);
            }
          });
      } else {
        reject(new Error('Invalid data type for parameter \'credential\'.'));
      }
    });
  }
}
