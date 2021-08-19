import axios from 'axios';
import Credential from '../entities/credential';
import Session from '../entities/session';

export default class AuthenticationService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/authentication');
    this.headers = {
      // Authorization: AbstractCrudService.getDefaultJwt(),
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
        axios.delete(String(this.url).concat('/logout'), session, { headers: this.headers })
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
