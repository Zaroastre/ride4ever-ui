import axios from 'axios';
import Pilot from '../entities/pilot';

export default class RegistrationService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/registration');
    this.headers = {
      // Authorization: AbstractCrudService.getDefaultJwt(),
      'Content-Type': 'application/json',
    };
  }

  create(pilot) {
    return new Promise((resolve, reject) => {
      if (pilot instanceof Pilot) {
        axios.post(String(this.url).concat('/register'), pilot, { headers: this.headers })
          .then((response) => {
            resolve(Pilot.parse(response.data));
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

  delete(pilot) {
    return new Promise((resolve, reject) => {
      if (pilot instanceof Pilot) {
        axios.delete(String(this.url).concat('/unregister'), pilot, { headers: this.headers })
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
