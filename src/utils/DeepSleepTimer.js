import { AppState } from 'react-native';
import Timer from './Timer';

class DeepSleeptimer extends Timer {
  constructor(onTimeout, delay) {
    super(onTimeout, delay);
    this.appState = AppState.currentState;
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  start(onStart) {
    super.start(onStart);
    this.setStartTime();
  }

  clear(onClear) {
    super.clearTimeout(onClear);
  }

  restart(onRestart) {
    super.restart(onRestart);
  }

  fire() {
    super.clear();
    this.onTimeout();
  }

  onForeground() {
    if (this.isTimeout()) this.fire();
  }

  setStartTime() {
    this.startTime = Date.now();
  }

  handleAppStateChange = (nextAppState) => {
    if (this.isGoForeFromBack(nextAppState)) this.onForeground();
    this.appState = nextAppState;
  };

  isGoForeFromBack = nextAppState =>
    this.appState.match(/inactive|background/) && nextAppState === 'active';

  isTimeout = () => Date.now() - this.startTime > this.delay;
}

export default DeepSleeptimer;
