const noop = () => {};

class Timer {
  constructor(onTimeout = noop, delay = 0) {
    this.onTimeout = onTimeout;
    this.delay = delay;
  }

  start(onStart = noop) {
    this.timer = setTimeout(this.onTimeout, this.delay);
    onStart();
  }

  clear(onClear = noop) {
    clearTimeout(this.timer);
    onClear();
  }

  restart(onRestart = noop) {
    this.clear();
    this.start();
    onRestart();
  }
}

export default Timer;
