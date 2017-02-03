const config = require('../../config');
const EventEmitter = require('events');
const redis = require('redis');

const distruptionSet = 'disruption';
const tweetSet = 'tweets';
const tweetQueue = 'tweetQueue';

class Database extends EventEmitter {

  constructor() {
    super();
    this.db = redis.createClient(config.redis);
    this.db.on('error', error => this.emit('error', error));
  }

  /**
   * Add a new disruption.
   *
   * @param {Object} disruption The disruption data to add.
   * @returns {Promise}
   **/
  addDisruption(disruption) {
    return new Promise((resolve, reject) => {
      const id = `${distruptionSet}:${disruption.id}`;

      // TODO: I don't think we care about duplicates here, we'll just
      // overwrite if the key exists with the new disruption information.
      this.db.exists(id, (error, exists) => {
        if (error) {
          return reject(error);
        }

        if (!exists) {
          this.db.hmset(id, disruption, error => {
            if (error) {
              return reject(error);
            }
          });
        }

        return resolve();
      });
    });
  }

  /**
   * Add a new tweet to the queue.
   *
   * @param {String} id The Service ID.
   * @param {String} tweet The tweet to store.
   * @returns {Promise}
   **/
  addTweet(id, tweet) {
    return new Promise((resolve, reject) => {
      
      // TODO: Maybe we should abstract this out and remove the duplicate
      // check from the service to higher up. Instead, inserting a tweet just
      // updates the set and the list.
      this.db.hexists(tweetSet, id, (error, exists) => {
        if (error) {
          return reject(error);
        }

        if (!exists) {
          this.db.hmset(tweetSet, id, tweet, error => {
            if (error) {
              return reject(error);
            }

            this.db.rpush(tweetQueue, tweet, error => {
              if (error) {
                return reject(error);
              }
            });
          });
        }

        return resolve();
      });
    });
  }

  /**
   * Pop the next tweet from the queue.
   *
   * @returns {Promise}
   */
  getNextTweet() {
    return new Promise((resolve, reject) => {
      this.db.lpop(tweetQueue, (error, item) => {
        if (error) {
          return reject(error);
        }

        return resolve(item);
      });
    });
  }
}

module.exports = Database;
