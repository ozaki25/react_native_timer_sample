import { AppState } from 'react-native';
import Timer from './Timer';

class DeepSleepTimer extends Timer {
  constructor(onTimeout, delay) {
    super(() => {
      AppState.removeEventListener('change', this.handleAppStateChange);
      onTimeout();
    }, delay);
    this.appState = AppState.currentState;
  }

  start(onStart) {
    AppState.addEventListener('change', this.handleAppStateChange);
    super.start(onStart);
    this.setStartTime();
  }

  clear(onClear) {
    AppState.removeEventListener('change', this.handleAppStateChange);
    super.clear(onClear);
  }

  fire() {
    super.clear();
    this.onTimeout();
  }

  setStartTime() {
    this.startTime = Date.now();
  }

  onForeground() {
    if (this.isTimeout()) {
      this.fire();
    } else {
      this.restart();
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (this.isGoForeFromBack(nextAppState)) this.onForeground();
    this.appState = nextAppState;
  };

  isGoForeFromBack = nextAppState =>
    this.appState.match(/inactive|background/) && nextAppState === 'active';

  isTimeout = () => Date.now() - this.startTime > this.delay;
}

export default DeepSleepTimer;
