const config = require('../config');
const Poller = require('./Poller');
const { getFeed } = require('./feed');
const { reportDelay } = require('./reporter');

const poller = new Poller(config.poller.duration);

function onPoll() {
  getFeed()
    .then(feed => {
      feed.forEach(service => {
        if (service.status === 'LATE') {
          reportDelay(
            service.operator,
            service.origin_name,
            service.destination_name,
            service.aimed_departure_time,
            service.expected_departure_time
          );
        }
      });
    })
    .catch(error => console.error);
};

poller.on('poll', onPoll);
poller.poll();
