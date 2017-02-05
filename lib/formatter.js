const config = require('../config');
const moment = require('moment');

/**
 * Generate a report for the service.
 *
 * @param {String} status The status of the service.
 * @param {String} operator The operator ATOC code.
 * @param {String} origin The origin station of the service.
 * @param {String} destination The destination station of the service.
 * @param {String} expected The expected departure time of the service.
 * @param {String} actual The actual departure time of the service.
 * @returns {String} The service report.
 */
function generateReport({ status, operator, origin, destination, expected, actual }) {
  const handle = config.operators[operator] || config.operators.DEFAULT;
  const tags = config.tags.join(' ');
  let message = 'delayed!';

  if (status === 'LATE' && expected && actual) {
    const delay = getDuration(expected, actual);

    message = `${delay} late!`;
  }

  if (status === 'CANCELLED') {
    message = 'cancelled!';
  }

  return `Hey ${handle}! The ${expected} from ${origin} to ${destination} is ${message} ${tags}`;
};

function getDuration(expected, actual) {
  const exp = moment(expected, 'HH:mm');
  const act = moment(actual, 'HH:mm');

  // if the delay spans over 00:00 then we need to specify
  // this is the next day, rather than the same as the expected.
  if (exp.hour() !== 0 && act.hour() === 0) {
      act.add(1, 'days');
  }

  return moment.duration(exp.diff(act)).humanize();
};

module.exports = {
  generateReport,
};
