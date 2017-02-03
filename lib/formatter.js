const config = require('../config');
const moment = require('moment');

function generateLateReport(operator, origin, destination, expected, actual) {
  const handle = config.operators[operator] || config.operators.DEFAULT;
  const tags = config.tags.join(' ');
  const delay = getDuration(expected, actual);
  
  return `Hey ${handle}! The ${expected} from ${origin} to ${destination} is ${delay} late! ${tags}`;
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
  generateLateReport,
};
