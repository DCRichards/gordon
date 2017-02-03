const { database } = require('./services');

function storeReport(id, report) {
  return database.addTweet(id, report);
};

function getNextReport() {
  return database.getNextTweet();
};

module.exports = {
  storeReport,
  getNextReport,
};
