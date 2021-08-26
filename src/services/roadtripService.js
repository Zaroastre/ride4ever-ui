import axios from 'axios';
import RoadTrip from '../entities/roadtrip';

export default class RoadtripService {
  constructor() {
    this.url = String(process.env.REACT_APP_API_URL).concat('/roadtrips');
    this.headers = {
      // Authorization: AbstractCrudService.getDefaultJwt(),
      'Content-Type': 'application/json',
    };
  }

  create(entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof RoadTrip) {
        axios.post(String(this.url), entity, { headers: this.headers })
          .then((response) => {
            resolve(RoadTrip.parse(response.data));
          })
          .catch((exception) => {
            if (exception.response === undefined) {
              reject(new Error('Server is unreachable.'));
            } else {
              reject(exception.response);
            }
          });
      } else {
        reject(new Error('Invalid data type for parameter \'entity\'.'));
      }
    });
  }

  findRoadtrips(filters = null) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url), { headers: this.headers, params: filters })
        .then((response) => {
          const roadtrips = [];
          if (Array.isArray(response.data)) {
            for (let index = 0; index < response.data.length; index += 1) {
              roadtrips.push(RoadTrip.parse(response.data[index]));
            }
          } else {
            roadtrips.push(RoadTrip.parse(response.data));
          }
          resolve(roadtrips);
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
  findById(identifier) {
    return new Promise((resolve, reject) => {
      axios.get(String(this.url).concat('/').concat(identifier), { headers: this.headers })
        .then((response) => {
          const roadtrip = RoadTrip.parse(response.data);
          resolve(roadtrip);
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


  getRoadtripsTypes() {
    return new Promise((resolve, reject) => {
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
    });
  }

  delete(entity) {
    return new Promise((resolve, reject) => {
      if (entity instanceof RoadTrip) {
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
