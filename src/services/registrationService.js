import axios from 'axios';
import Biker from '../entities/biker';
import AbstractService from './abstractService';

export default class RegistrationService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/registration');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  create(biker) {
    return new Promise((resolve, reject) => {
      if (biker instanceof Biker) {
        axios.post(String(this.url).concat('/register'), biker, { headers: this.headers })
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
        reject('Invalid data type for data \'credential\'.');
      }
    });
  }

  delete(biker) {
    return new Promise((resolve, reject) => {
      if (biker instanceof Biker) {
        axios.delete(String(this.url).concat('/unregister'), biker, { headers: this.headers })
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
        reject('Invalid data type for data \'biker\'.');
      }
    });
  }
}
