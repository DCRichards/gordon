const { twitter } = require('./services');

function postReport(report) {
  return twitter.tweet(report);
};

module.exports = {
    postReport,
};
