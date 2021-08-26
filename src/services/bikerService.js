import axios from 'axios';
import Biker from '../entities/biker';

export default class BikerService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/bikers');
    this.headers = {
      // Authorization: AbstractCrudService.getDefaultJwt(),
      'Content-Type': 'application/json',
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
      if (entity instanceof Biker) {
        axios.put(String(this.url).concat('/').concat(identifier), entity, { headers: this.headers })
          .then((response) => {
            resolve(Biker.parse(response.data));
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

  getGenders() {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/genders'), { headers: this.headers })
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
