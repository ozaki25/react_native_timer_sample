import Timer from '../../../src/utils/DeepSleepTimer';

jest.useFakeTimers();

describe('DeepSleepTimer', () => {
  describe('#constroctur', () => {
    test('onTimeout:タイマーが発火すると処理が一度呼ばれること', () => {
      const onTimeout = jest.fn();
      const timer = new Timer(onTimeout);
      timer.start();

      expect(onTimeout).not.toBeCalled();
      jest.runAllTimers();
      expect(onTimeout).toBeCalled();
      expect(onTimeout).toHaveBeenCalledTimes(1);
    });
    test('delay:指定時間経過後に処理が実行されること', () => {
      const delay = 1000;
      const onTimeout = jest.fn();
      const timer = new Timer(onTimeout, delay);
      timer.start();
      expect(setTimeout).toHaveBeenLastCalledWith(onTimeout, delay);
    });
  });
  describe('#start', () => {
    describe('引数がない場合', () => {
      test('タイマーが起動し一度だけ発火すること', () => {
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
      test('タイマーが起動し一度だけ発火すること', () => {
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
      test('タイマーが停止すること', () => {
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
      test('タイマーが停止すること', () => {
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
      test('タイマーが再起動し一度だけ発火すること', () => {
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
      test('タイマーが再起動し一度だけ発火すること', () => {
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
  describe('#isTimeout', () => {
    test('指定した時間が経過している場合tureを返すこと', () => {
      const onTimeout = jest.fn();
      const delay = 10000;
      const timer = new Timer(onTimeout, delay);

      timer.startTime = Date.now() - delay - 1000;
      const isTimeout = timer.isTimeout();
      expect(isTimeout).toBeTruthy();
    });
    test('指定した時間が経過していない場合falseを返すこと', () => {
      const onTimeout = jest.fn();
      const delay = 10000;
      const timer = new Timer(onTimeout, delay);

      timer.startTime = Date.now() - delay + 1000;
      const isTimeout = timer.isTimeout();
      expect(isTimeout).toBeFalsy();
    });
  });
});
