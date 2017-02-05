class Poller {

  /**
   * Create a new instance of Poller.
   *
   * @param {Number} interval The interval in milliseconds.
   */
  constructor(interval) {
    this.interval = interval;
    this.events = {};
  }

  /**
   * Add an event listener for the specified event.
   *
   * @param {String} event The event to listen for.
   * @param {Function} action The callback function.
   */
  on(event, action) {
    // TODO: implement this with EventEmitter instead?
    if (['poll'].includes(event)) {
      this.events[event] = action;
    }
  }

  /**
   * Stop polling if the poller is running.
   */
  stop() {
    clearInterval(this.timer);
    delete this.timer;
  }

  /**
   * Begin polling if the poller has not already started.
   */
  poll() {
    if (this.events.poll && !this.timer) {
      this.timer = setInterval(this.events.poll, this.interval);
    }
  }
}

module.exports = Poller;
