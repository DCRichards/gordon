const log = require('npmlog');
const { queue, twitter } = require('./services');

/**
 * Send the next report in the queue.
 *
 * @returns {Promise.<String>}
 */
function sendNext() {
  return queue.pop()
    .then(report => {
      if (!report) {
        return Promise.resolve();
      }

      return twitter.tweet(report);
    })
    .then(response => {
      if (!response) {
        return Promise.resolve();
      }

      return Promise.resolve(response.text);
    })
    .catch(error => Promise.reject(error));
};

module.exports = {
    sendNext,
};
