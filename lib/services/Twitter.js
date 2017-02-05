const Twitter = require('twitter');
const config = require('../../config');

class TwitterService {

  constructor() {
    this.twitter = new Twitter(config.twitter);
  }

  /**
   * Post a new Tweet.
   *  
   * @param {String} status The tweet to post.
   * @returns {Promise.<Object>}
   */
  tweet(status) {
    return this.twitter.post('statuses/update', { status });
  }
}

module.exports = TwitterService;
