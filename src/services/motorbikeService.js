import axios from 'axios';
import Motorbike from '../entities/motorbike';

export default class MotorbikeService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/motorbikes');
    this.headers = {
      // Authorization: AbstractCrudService.getDefaultJwt(),
      'Content-Type': 'application/json',
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

  getMotorbikesTypes() {
    return new Promise((resolve, reject) => {
      if (entity instanceof Motorbike) {
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
      } else {
        reject(new Error('Invalid data type for parameter \'credential\'.'));
      }
    });
  }

  delete(entity) {
    return new Promise((resolve, reject) => {
      if (biker instanceof Pilot) {
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
