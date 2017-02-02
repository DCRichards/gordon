const Twitter = require('./Twitter');
const Transport = require('./Transport');

module.exports = {
  twitter: new Twitter(),
  transport: new Transport(),
};
