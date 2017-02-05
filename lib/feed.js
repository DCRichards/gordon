const config = require('../config');
const { transport } = require('./services');

/**
 * Get the feed of current distruptions.
 *
 * @returns {Promise.<Array>}
 */
function getFeed() {
  return Promise.all(config.stations.map(station => transport.getDisruptions(station)))
    .then(res => Promise.resolve([].concat.apply([], res)))
    .catch(error => Promise.reject(error));
};

module.exports = {
  getFeed,
};
