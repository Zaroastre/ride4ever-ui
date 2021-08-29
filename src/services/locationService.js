import axios from 'axios';
import AbstractService from './abstractService';

export default class LocationService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/locations');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  lookupIpAddress(ipAddress) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/ip-lookup'), { headers: this.headers, params: { ipAddress } })
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

  lookupCoordinates(latitude, longitude) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/coordinates-lookup'), { headers: this.headers, params: { latitude, longitude }  })
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
