class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('listener not a function');
    }
    if (typeof this.events[eventName] !== 'object') {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    const event = this.events[eventName];
    event && event.forEach((fn) => fn.call(null, args));
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      throw new Error('There is no eventName in events');
    }
    if (typeof this.events[eventName] === 'object') {
      let index = this.events[eventName].indexOf(listener);
      if (index > -1) {
        this.events[eventName].splice(index, 1);
      }
    }
  }

  listeners(eventName) {
    return this.events[eventName];
  }
}