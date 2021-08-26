import axios from 'axios';
import Address from '../entities/address';

export default class AddressService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/addresses');
    this.headers = {
      // Authorization: AbstractCrudService.getDefaultJwt(),
      'Content-Type': 'application/json',
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
      if (entity instanceof Address) {
        axios.put(String(this.url).concat('/').concat(identifier), entity, { headers: this.headers })
          .then((response) => {
            resolve(Address.parse(response.data));
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

  getCountries() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/countries'), { headers: this.headers })
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
}
