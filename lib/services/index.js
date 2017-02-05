const Queue = require('./Queue');
const Transport = require('./Transport');
const Twitter = require('./Twitter');

module.exports = {
  queue: new Queue(),
  transport: new Transport(),
  twitter: new Twitter(),
};
