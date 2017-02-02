const axios = require('axios');
const config = require('../../config');

class TransportService {

  constructor() {
    this.api = axios.create({
      baseURL: config.transport.url,
      params: {
        app_id: config.transport.app_id,
        app_key: config.transport.app_key,
        darwin: true,
      },
    });
  }

  /**
   * Get disrupted services from the specified station.
   *
   * Note that stations are identified by CRS code
   * http://www.railwaycodes.org.uk/crs/CRS0.shtm.
   *
   * @param {String} station The CRS code of the station.
   * @return {Promise}
   */
  getDisruptions(station) {
    return this.api.get(`uk/train/station/${station}/live.json`)
      .then(res => {
        const departures = res.data.departures.all;
        const delays = departures.filter(departure => ['LATE', 'CANCELLED'].includes(departure.status));

        return Promise.resolve(delays);
      })
      .catch(error => Promise.reject(error));
  }
}

module.exports = TransportService;
