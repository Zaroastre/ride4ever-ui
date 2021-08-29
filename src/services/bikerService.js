import axios from 'axios';
import Biker from '../entities/biker';
import AbstractService from './abstractService';

export default class BikerService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/bikers');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  create(entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Biker) {
        axios.post(String(this.url), entity, { headers: this.headers })
          .then((response) => {
            resolve(Biker.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'entity\'.');
      }
    });
  }

  update(identifier, entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Biker) {
        axios.put(String(this.url).concat('/').concat(identifier), entity, { headers: this.headers })
          .then((response) => {
            resolve(Biker.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'entity\'.');
      }
    });
  }

  getGenders() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/genders'), { headers: this.headers })
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
}
