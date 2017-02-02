const config = require('../config');
const { transport } = require('./services');

function getFeed() {
  return Promise.all(config.stations.map(station => transport.getDisruptions(station)))
    .then(res => {
      return Promise.resolve([].concat.apply([], res));
    })
    .catch(error => Promise.reject(error));
};

function format() {
  
};

module.exports = {
  getFeed,
};
