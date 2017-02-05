const config = require('../config');
const log = require('npmlog');
const Poller = require('./Poller');
const { generateReport } = require('./formatter');
const { getFeed } = require('./feed');
const { model } = require('./model');
const { queue } = require('./queue');
const { sendNext } = require('./reporter');

const poller = new Poller(config.poller.duration);

function onPoll() {
  return getFeed()
    .then(feed => feed.map(data => model(data)))
    .then(services => Promise.all(services.map(service => {
      return { id: service.id, report: generateReport(service) };
    })))
    .then(reports => queue(reports))
    .then(() => sendNext())
    .then(report => log.info('index', report ? `Sent report: ${report}` : 'No reports to send.'))
    .catch(error => log.error('error', error));
};

poller.on('poll', onPoll);
poller.poll();
