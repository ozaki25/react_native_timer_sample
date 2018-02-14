import Timer from '../../../src/utils/Timer';

jest.useFakeTimers();

describe('Timer', () => {
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
    test('引数がない場合でも起動すること', () => {
      const timer = new Timer();
      timer.start();
      expect(setTimeout).toHaveBeenCalled();
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
});
