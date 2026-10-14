import { Build } from '@stencil/core';
import { EffectManager } from '@/utils/effect-manager';

class Context {
  calls: unknown[];
}

function createCallback<A extends unknown[]>() {
  return jest.fn(function (this: Context, ..._args: A) {
    return this;
  });
}

describe('EffectManager', () => {
  let context: Context;
  let manager: EffectManager<Context>;

  beforeEach(() => {
    jest.useFakeTimers();

    context = new Context();
    manager = new EffectManager(context);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  describe('browser environment', () => {
    beforeEach(() => {
      Build.isServer = false;
      Build.isBrowser = true;
    });

    describe('setTimeout', () => {
      it('should call the callback after the specified delay, bound to the context', () => {
        const callback = createCallback();

        manager.setTimeout(callback, 2);
        jest.advanceTimersByTime(1);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.results[0].value).toBe(context);
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback when canceled', () => {
        const callback = jest.fn();

        manager.setTimeout(callback, 2).cancel();
        jest.advanceTimersByTime(4);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback after disconnect', () => {
        const callback = jest.fn();

        manager.setTimeout(callback, 2);
        manager.disconnect();
        jest.advanceTimersByTime(4);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not clear the timeout when canceled after completion', () => {
        const clear = jest.spyOn(globalThis, 'clearTimeout');
        const effect = manager.setTimeout(jest.fn(), 2);

        jest.advanceTimersByTime(2);
        effect.cancel();

        expect(clear).not.toHaveBeenCalled();
      });
    });

    describe('setInterval', () => {
      it('should call the callback repeatedly, bound to the context', () => {
        const callback = createCallback();

        manager.setInterval(callback, 2);

        for (let i = 1; i <= 6; i++) {
          jest.advanceTimersByTime(1);
          expect(callback).toHaveBeenCalledTimes(Math.floor(i / 2));
          expect(manager.activeEffects).toBe(1);
        }

        for (const result of callback.mock.results) {
          expect(result.value).toBe(context);
        }
      });

      it('should not call the callback when canceled', () => {
        const callback = jest.fn();
        const effect = manager.setInterval(callback, 2);

        jest.advanceTimersByTime(2);
        effect.cancel();
        jest.advanceTimersByTime(4);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback after disconnect', () => {
        const callback = jest.fn();

        manager.setInterval(callback, 2);
        manager.disconnect();
        jest.advanceTimersByTime(4);

        expect(callback).not.toHaveBeenCalled();
      });
    });

    describe('debounce', () => {
      it('should only call the callback once with the latest arguments, bound to the context', () => {
        const callback = createCallback<[number]>();
        const debounced = manager.debounce(callback, 2);

        for (let i = 1; i <= 3; i++) {
          debounced(i);

          jest.advanceTimersByTime(1);
          expect(callback).not.toHaveBeenCalled();
          expect(manager.activeEffects).toBe(1);
        }

        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(3);
        expect(callback.mock.results[0].value).toBe(context);
        expect(manager.activeEffects).toBe(0);
      });

      it('should be reusable after the callback has been called', () => {
        const callback = createCallback<[number, number]>();
        const debounced = manager.debounce(callback, 2);

        for (let i = 1; i <= 3; i++) {
          for (let j = 1; j <= 3; j++) {
            debounced(i, j);

            jest.advanceTimersByTime(1);
            expect(callback).toHaveBeenCalledTimes(i - 1);
            expect(manager.activeEffects).toBe(1);
          }

          jest.advanceTimersByTime(1);

          expect(callback).toHaveBeenCalledTimes(i);
          expect(callback).toHaveBeenCalledWith(i, 3);
          expect(callback.mock.results[0].value).toBe(context);
          expect(manager.activeEffects).toBe(0);
        }
      });

      it('should not call the callback when canceled', () => {
        const callback = createCallback();
        const debounced = manager.debounce(callback, 2);

        debounced();
        debounced.cancel();
        jest.advanceTimersByTime(2);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback after disconnect', () => {
        const callback = jest.fn();
        const debounced = manager.debounce(callback, 2);

        debounced();
        manager.disconnect();
        jest.advanceTimersByTime(2);

        expect(callback).not.toHaveBeenCalled();
      });
    });
  });

  describe('server environment', () => {
    // beforeEach(() => {
    //   Build.isServer = true;
    //   Build.isBrowser = false;
    // });
  });
});
