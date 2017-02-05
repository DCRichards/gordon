const config = require('../../config');
const EventEmitter = require('events');
const redis = require('redis');

const STORE = 'reports';
const QUEUE = 'reportsQueue';

class QueueService extends EventEmitter {

  constructor() {
    super();
    this.db = redis.createClient(config.redis);
    this.db.on('error', error => this.emit('error', error));
  }

  /**
   * Check if a report exists in the queue.
   *
   * @param {String} id The ID of the report.
   * @returns {Promise.<Boolean>}
   **/
  exists(id) {
    return new Promise((resolve, reject) => {
      this.db.hexists(STORE, id, (error, exists) => {
        if (error) {
          return reject(error);
        }

        return resolve(exists);
      });
    });
  }

  /**
   * Push a new report onto the queue.
   *
   * @param {String} id The report id.
   * @param {String} report The report to store.
   * @returns {Promise}
   **/
  push(id, report) {
    return new Promise((resolve, reject) => {
      this.db.hmset(STORE, id, report, error => {
        if (error) {
          return reject(error);
        }

        this.db.rpush(QUEUE, report, error => {
          if (error) {
            return reject(error);
          }

          return resolve();
        });
      });
    });
  }

  /**
   * Get and remove the next report from the queue.
   *
   * @returns {Promise.<String>}
   */
  pop() {
    return new Promise((resolve, reject) => {
      this.db.lpop(QUEUE, (error, item) => {
        if (error) {
          return reject(error);
        }

        return resolve(item);
      });
    });
  }
}

module.exports = QueueService;
