const { queue } = require('./services');

/**
 * Add reports to the queue.
 *
 * @param {Array.<Object>} reports The array of reports to enqueue.
 * @return {Promise}
 */
function enqueue(reports) {
  return Promise.all(reports.map(({ id, report }) => push(id, report)));
};

function push(id, report) {
  return queue.exists(id)
    .then(exists => {
      if (!exists) {
        return queue.push(id, report);
      }
      
      return Promise.resolve();
    })
    .catch(error => Promise.reject(error));
};

module.exports = {
  queue: enqueue,
};
