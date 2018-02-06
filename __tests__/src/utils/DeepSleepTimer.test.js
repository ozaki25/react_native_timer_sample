import Timer from '../../../src/utils/DeepSleepTimer';

jest.useFakeTimers();

describe('DeepSleepTimer', () => {
  describe('#constroctur', () => {
    test('タイマーが発火するとonTimeoutが一回呼ばれること', () => {
      const onTimeout = jest.fn();
      const timer = new Timer(onTimeout);
      timer.start();

      expect(onTimeout).not.toBeCalled();
      jest.runAllTimers();
      expect(onTimeout).toBeCalled();
      expect(onTimeout).toHaveBeenCalledTimes(1);
    });
    test('delayで指定した時間経過後に処理が実行されること', () => {
      const delay = 1000;
      const onTimeout = jest.fn();
      const timer = new Timer(onTimeout, delay);
      timer.start();
      expect(setTimeout).toHaveBeenLastCalledWith(onTimeout, delay);
    });
  });
  describe('#start', () => {
    describe('引数がない場合', () => {
      test('タイマーが起動しonTimeoutが一回呼ばれること', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start();

        expect(onTimeout).not.toBeCalled();
        jest.runAllTimers();
        expect(onTimeout).toBeCalled();
        expect(onTimeout).toHaveBeenCalledTimes(1);
      });
    });
    describe('引数がある場合', () => {
      test('onTimeoutが一回呼ばれること', () => {
        const onTimeout = jest.fn();
        const onStart = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start(onStart);

        expect(onTimeout).not.toBeCalled();
        jest.runAllTimers();
        expect(onTimeout).toBeCalled();
        expect(onTimeout).toHaveBeenCalledTimes(1);
      });
      test('onStartが一回呼ばれること', () => {
        const onTimeout = jest.fn();
        const onStart = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start(onStart);

        expect(onStart).toBeCalled();
        jest.runAllTimers();
        expect(onStart).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('#clear', () => {
    describe('引数がない場合', () => {
      test('onTimeoutが呼ばれないこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start();
        timer.clear();

        expect(onTimeout).not.toBeCalled();
        jest.runAllTimers();
        expect(onTimeout).not.toBeCalled();
      });
    });
    describe('引数がある場合', () => {
      test('onTimeoutが呼ばれないこと', () => {
        const onTimeout = jest.fn();
        const onClear = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start();
        timer.clear(onClear);

        expect(onTimeout).not.toBeCalled();
        jest.runAllTimers();
        expect(onTimeout).not.toBeCalled();
      });
      test('onClearが一回呼ばれること', () => {
        const onTimeout = jest.fn();
        const onClear = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start();
        timer.clear(onClear);

        expect(onClear).toBeCalled();
        jest.runAllTimers();
        expect(onClear).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('#reset', () => {
    describe('引数がない場合', () => {
      test('onTimeoutが一回呼ばれること', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start();
        timer.restart();

        expect(onTimeout).not.toBeCalled();
        jest.runAllTimers();
        expect(onTimeout).toBeCalled();
        expect(onTimeout).toHaveBeenCalledTimes(1);
      });
    });
    describe('引数がある場合', () => {
      test('onTimeoutが一回呼ばれること', () => {
        const onTimeout = jest.fn();
        const onRestart = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start();
        timer.restart(onRestart);

        expect(onTimeout).not.toBeCalled();
        jest.runAllTimers();
        expect(onTimeout).toBeCalled();
        expect(onTimeout).toHaveBeenCalledTimes(1);
      });
      test('onRestartが一回呼ばれること', () => {
        const onTimeout = jest.fn();
        const onRestart = jest.fn();
        const timer = new Timer(onTimeout);
        timer.start();
        timer.restart(onRestart);

        expect(onRestart).toBeCalled();
        jest.runAllTimers();
        expect(onRestart).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('#fire', () => {
    test('onTimeoutが一回呼ばれタイマーが止まっていること', () => {
      const onTimeout = jest.fn();
      const timer = new Timer(onTimeout);
      timer.start();
      timer.fire();

      expect(onTimeout).toBeCalled();
      jest.runAllTimers();
      expect(onTimeout).toHaveBeenCalledTimes(1);
    });
  });
  describe('#onForeground', () => {
    test('タイムアウトしている場合fireが一回呼ばれること', () => {
      const timer = new Timer();
      timer.fire = jest.fn();
      timer.restart = jest.fn();
      timer.isTimeout = jest.fn().mockReturnValue(true);
      timer.onForeground();

      expect(timer.restart).not.toBeCalled();
      expect(timer.fire).toBeCalled();
      expect(timer.fire).toHaveBeenCalledTimes(1);
    });
    test('タイムアウトしていない場合restartが一回呼ばれること', () => {
      const timer = new Timer();
      timer.fire = jest.fn();
      timer.restart = jest.fn();
      timer.isTimeout = jest.fn().mockReturnValue(false);
      timer.onForeground();

      expect(timer.fire).not.toBeCalled();
      expect(timer.restart).toBeCalled();
      expect(timer.restart).toHaveBeenCalledTimes(1);
    });
  });
  describe('#handleAppStateChange', () => {
    describe('バックグラウンドからフォアグラウンドへの復帰の場合', () => {
      test('onForgroundが一回呼ばれること', () => {
        const timer = new Timer();
        const nextAppState = 'active';
        timer.isGoForeFromBack = jest.fn().mockReturnValue(true);
        timer.onForeground = jest.fn();
        timer.handleAppStateChange(nextAppState);

        expect(timer.onForeground).toBeCalled();
        expect(timer.onForeground).toHaveBeenCalledTimes(1);
      });
      test('nextAppStateの値がappStateにセットされていること', () => {
        const timer = new Timer();
        const nextAppState = 'active';
        timer.isGoForeFromBack = jest.fn().mockReturnValue(true);
        timer.onForeground = jest.fn();
        timer.handleAppStateChange(nextAppState);

        expect(timer.appState).toBe(nextAppState);
      });
    });
    describe('バックグラウンドからフォアグラウンドへの復帰ではない場合', () => {
      test('nextAppStateの値がappStateにセットされていること', () => {
        const timer = new Timer();
        const nextAppState = 'inactive';
        timer.isGoForeFromBack = jest.fn().mockReturnValue(false);
        timer.onForeground = jest.fn();
        timer.handleAppStateChange(nextAppState);

        expect(timer.onForeground).not.toBeCalled();
        expect(timer.appState).toBe(nextAppState);
      });
    });
  });
  describe('#isTimeout', () => {
    test('指定した時間が経過している場合tureを返すこと', () => {
      const onTimeout = jest.fn();
      const delay = 10000;
      const timer = new Timer(onTimeout, delay);

      timer.startTime = Date.now() - delay - 1;
      const isTimeout = timer.isTimeout();
      expect(isTimeout).toBeTruthy();
    });
    test('指定した時間が経過していない場合falseを返すこと', () => {
      const onTimeout = jest.fn();
      const delay = 10000;
      const timer = new Timer(onTimeout, delay);

      timer.startTime = Date.now() - delay + 1;
      const isTimeout = timer.isTimeout();
      expect(isTimeout).toBeFalsy();
    });
  });
  describe('#isGoForeFromBack', () => {
    describe('現在のappStateがactiveの場合', () => {
      test('nextAppStateがactiveの場合falseを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'active';
        const nextAppState = 'active';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeFalsy();
      });
      test('nextAppStateがinactiveの場合falseを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'active';
        const nextAppState = 'inactive';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeFalsy();
      });
      test('nextAppStateがbackgroundの場合falseを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'active';
        const nextAppState = 'background';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeFalsy();
      });
    });
    describe('現在のappStateがinactiveの場合', () => {
      test('nextAppStateがactiveの場合trueを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'inactive';
        const nextAppState = 'active';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeTruthy();
      });
      test('nextAppStateがinactiveの場合falseを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'inactive';
        const nextAppState = 'inactive';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeFalsy();
      });
      test('nextAppStateがbackgroundの場合falseを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'inactive';
        const nextAppState = 'background';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeFalsy();
      });
    });
    describe('現在のappStateがbackgroundの場合', () => {
      test('nextAppStateがactiveの場合trueを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'background';
        const nextAppState = 'active';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeTruthy();
      });
      test('nextAppStateがinactiveの場合falseを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'background';
        const nextAppState = 'inactive';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeFalsy();
      });
      test('nextAppStateがbackgroundの場合falseを返すこと', () => {
        const onTimeout = jest.fn();
        const timer = new Timer(onTimeout);

        timer.appState = 'background';
        const nextAppState = 'background';
        const isGoForeFromBack = timer.isGoForeFromBack(nextAppState);
        expect(isGoForeFromBack).toBeFalsy();
      });
    });
  });
});
