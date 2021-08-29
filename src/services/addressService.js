import axios from 'axios';
import Address from '../entities/address';
import AbstractService from './abstractService';

export default class AddressService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/addresses');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  create(entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Address) {
        axios.post(String(this.url), entity, { headers: this.headers })
          .then((response) => {
            resolve(Address.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'address\'.');
      }
    });
  }

  update(identifier, entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof Address) {
        axios.put(String(this.url).concat('/').concat(identifier), entity, { headers: this.headers })
          .then((response) => {
            resolve(Address.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject('Server is unreachable.');
            } else {
              reject(exception.response.data.error);
            }
          });
      } else {
        reject('Invalid data type for data \'address\'.');
      }
    });
  }

  getCountries() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/countries'), { headers: this.headers })
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
