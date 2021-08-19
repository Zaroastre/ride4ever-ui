import axios from 'axios';

export default class AbstractCrudService {
  constructor(url) {
    this.url = url;
    this.headers = {
      Authorization: AbstractCrudService.getDefaultJwt(),
    };
  }

  static getDefaultJwt() {
    let jwt = document.cookie.split('=')[1];
    if (jwt) {
      jwt = `Bearer ${jwt}`;
      return jwt;
    }
    return null;
  }

  /**
   * Convert raw test to JSON object.
   * @param {*} string Raw text to parse as JSON object.
   */
  static toJson(string) {
    let json = null;
    try {
      json = JSON.parse(string);
      return json;
    } catch (error) {
      console.error(error);
      console.error(string);
      return null;
    }
  }

  /**
   * Get entities from an HTTP request.
   * @param {Object} filters Object properties to use for filtering.
   * @returns Promise
   */
  get(filters) {
    return new Promise((resolve, reject) => {
      try {
        // Use AXIOS framework to process the HTTP request.
        axios.get(
          this.url,
          { headers: this.headers, params: filters },
        )
          .then((httpResponse) => {
            let json = null;
            if ((httpResponse.headers['content-type']) && (httpResponse.headers['content-type'] === 'application/json')) {
              json = httpResponse.data;
            } else {
              json = this.toJson(httpResponse.data);
            }
            if (json) {
              resolve(json);
            } else {
              reject(new Error(String('Error while parsing data to JSON: ').concat(httpResponse.data)));
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get entities from an HTTP request.
   * @param {Object} filters Object properties to use for filtering.
   * @param {Object} identifier Identifier of the object to found.
   * @returns Promise
   */
  find(filters, identifier) {
    return new Promise((resolve, reject) => {
      try {
        // Use AXIOS framework to process the HTTP request.
        axios.get(
          String(this.url).concat(`/${identifier}`),
          { headers: this.headers, params: filters },
        )
          .then((httpResponse) => {
            let json = null;
            if ((httpResponse.headers['content-type']) && (httpResponse.headers['content-type'] === 'application/json')) {
              json = httpResponse.data;
            } else {
              json = this.toJson(httpResponse.data);
            }
            if (json) {
              resolve(json);
            } else {
              reject(new Error(String('Error while parsing data to JSON: ').concat(httpResponse.data)));
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create an entity to HTTP request.
   * @param {Object} filters Object properties to use for filtering.
   * @param {Object} json Json object
   * @returns Promise
   */
  create(filters, json) {
    return new Promise((resolve, reject) => {
      try {
        // Use AXIOS framework to process the HTTP request.
        const headers = { ...this.headers };
        headers['Content-Type'] = 'application/json';
        axios.post(
          this.url,
          json,
          { headers, params: filters },
        )
          .then((httpResponse) => {
            resolve(httpResponse.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update an entity to HTTP request.
   * @param {Object} filters Object properties to use for filtering.
   * @param {Object} identifier Identifier of the object to update.
   * @param {Object} json Json object
   * @returns Promise
   */
  update(filters, identifier, json) {
    return new Promise((resolve, reject) => {
      try {
        // Use AXIOS framework to process the HTTP request.
        const headers = { ...this.headers };
        headers['Content-Type'] = 'application/json';
        axios.put(
          String(this.url).concat('/').concat(identifier),
          json,
          { headers, params: filters },
        )
          .then((httpResponse) => {
            resolve(httpResponse.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Delete an entity to HTTP request.
   * @param {Object} filters Object properties to use for filtering.
   * @param {Object} identifier Identifier of the entity to delete.
   * @returns Promise
   */
  delete(filters, identifier) {
    return new Promise((resolve, reject) => {
      try {
        // Use AXIOS framework to process the HTTP request.
        const headers = { ...this.headers };
        headers['Content-Type'] = 'application/json';
        axios.delete(
          String(this.url).concat('/').concat(identifier),
          { headers, params: filters },
        )
          .then((httpResponse) => {
            resolve({ status: httpResponse.status, message: httpResponse.statusText });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
