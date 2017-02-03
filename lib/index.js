const config = require('../config');
const Poller = require('./Poller');
const { generateLateReport } = require('./formatter');
const { getFeed } = require('./feed');
const { sendReport } = require('./reporter');
const { storeReport, getNextReport } = require('./store');

const poller = new Poller(config.poller.duration);

function onPoll() {
  getFeed()
    .then(feed => {
      return Promise.all(feed.map(service => {
        if (service.status === 'LATE') {
          const report = generateLateReport(service.operator, service.origin_name, service.destination_name, service.aimed_departure_time, service.expected_departure_time);

          return storeReport(service.service, report);
        }
      }));
    })
    .then(() => getNextReport())
    .then(report => {
      if (!report) {
        return;
      }

      return postReport(report);
    })
    .then(report => console.info('%s %j', new Date().toISOString(), report))
    .catch(error => console.error(error));
};

poller.on('poll', onPoll);
poller.poll();
