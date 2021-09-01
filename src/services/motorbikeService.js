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

  create(motorbike) {
    return new Promise((resolve, reject) => {
      if (motorbike instanceof Motorbike) {
        axios.post(String(this.url), motorbike, { headers: this.headers })
          .then((response) => {
            resolve(Motorbike.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'motorbike\'.');
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
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'motorbike\'.');
      }
    });
  }

  findAll(filters = null) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url), { headers: this.headers, params: filters })
        .then((response) => {
          const motorbikes = [];
          if (Array.isArray(response.data)) {
            for (let index = 0; index < response.data.length; index += 1) {
              motorbikes.push(Motorbike.parse(response.data[index]));
            }
          } else {
            motorbikes.push(Motorbike.parse(response.data));
          }
          resolve(motorbikes);
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

  getMotorbikesTypes() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/types'), { headers: this.headers })
        .then((response) => {
          resolve(response.data);
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

  getBrands() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/brands'), { headers: this.headers })
        .then((response) => {
          resolve(response.data);
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

  delete(entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Motorbike) {
        axios.delete(String(this.url).concat('/').concat(entity.identifier), entity, { headers: this.headers })
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
        reject('Invalid data type for data \'motorbike\'.');
      }
    });
  }
}
