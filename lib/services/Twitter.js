const Twitter = require('twitter');
const config = require('../../config');

class TwitterService {

  constructor() {
    if (!config.twitter) {
      throw new Error('config.twitter not found. Have you set your API keys?');
    }
    this.twitter = new Twitter(config.twitter);
  }

  /**
   * Post a new Tweet.
   *  
   * @param {String} status The tweet to post.
   * @returns {Promise}
   */
  tweet(status) {
    return this.twitter.post('statuses/update', { status });
  }
}

module.exports = TwitterService;
