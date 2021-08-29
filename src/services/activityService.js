import axios from 'axios';
import Activity from '../entities/activity';
import AbstractService from './abstractService';

export default class ActivityService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/activities');
    this.headers = {
      Authorization: AbstractService.getJwt(),
      'Content-Type': 'application/json',
      'Session-ID': AbstractService.getSessionID(),
    };
  }

  findAll(filters = null) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url), { headers: this.headers, params: filters })
        .then((response) => {
          const activities = [];
          if (Array.isArray(response.data)) {
            for (let index = 0; index < response.data.length; index += 1) {
              activities.push(Activity.parse(response.data[index]));
            }
          } else {
            activities.push(Activity.parse(response.data));
          }
          resolve(activities);
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
