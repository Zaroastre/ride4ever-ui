import axios from 'axios';
import Credential from '../entities/credential';
import Session from '../entities/session';
import AbstractService from './abstractService';

export default class AuthenticationService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/authentication');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  login(credential) {
    return new Promise((resolve, reject) => {
      if (credential instanceof Credential) {
        axios.post(String(this.url).concat('/login'), credential, { headers: this.headers })
          .then((response) => {
            resolve(Session.parse(response.data));
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

  logout(session) {
    return new Promise((resolve, reject) => {
      if (session instanceof Session) {
        axios.delete(String(this.url).concat('/logout/').concat(session.id), { headers: this.headers })
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
