const Database = require('./Database');
const Transport = require('./Transport');
const Twitter = require('./Twitter');

module.exports = {
  database: new Database(),
  transport: new Transport(),
  twitter: new Twitter(),
};
