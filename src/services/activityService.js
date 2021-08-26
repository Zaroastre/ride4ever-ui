import axios from 'axios';
import Activity from '../entities/activity';

export default class ActivityService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/activities');
    this.headers = {
      // Authorization: AbstractCrudService.getDefaultJwt(),
      'Content-Type': 'application/json',
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
            reject(new Error('Server is unreachable.'));
          } else {
            reject(exception.response);
          }
        });
    });
  }

}
