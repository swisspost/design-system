import { Build } from '@stencil/core';
import { EffectManager } from '@/utils/effect-manager';

class Context {
  calls: unknown[];
}

function createCallback<A extends unknown[] = []>() {
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

    describe('addEventListener', () => {
      let target: HTMLElement;

      beforeEach(() => {
        target = document.createElement('div');
      });

      it('should call the callback with the event every time it is dispatched', () => {
        const callback = createCallback<[Event]>();

        manager.addEventListener(target, 'click', callback);

        for (let i = 1; i <= 3; i++) {
          const event = new Event('click');

          target.dispatchEvent(event);

          expect(callback).toHaveBeenCalledTimes(i);
          expect(callback).toHaveBeenLastCalledWith(event);
          expect(callback.mock.results.at(-1).value).toBe(context);
          expect(manager.activeEffects).toBe(1);
        }
      });

      it('should only call the callback once when the `once` option is set', () => {
        const callback = createCallback<[Event]>();
        const event = new Event('click');

        manager.addEventListener(target, 'click', callback, { once: true });
        target.dispatchEvent(event);

        for (let i = 0; i < 3; i++) {
          target.dispatchEvent(new Event('click'));

          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(event);
          expect(callback.mock.results[0].value).toBe(context);
          expect(manager.activeEffects).toBe(0);
        }
      });

      it('should forward the native options to the target, without the `once` option', () => {
        const add = jest.spyOn(target, 'addEventListener');
        const remove = jest.spyOn(target, 'removeEventListener');

        manager
          .addEventListener(target, 'click', jest.fn(), { once: true, passive: true })
          .cancel();

        expect(add).toHaveBeenCalledWith('click', expect.any(Function), { passive: true });
        expect(remove).toHaveBeenCalledWith('click', expect.any(Function), { passive: true });
      });

      it('should treat a boolean option as the `capture` option', () => {
        const add = jest.spyOn(target, 'addEventListener');
        const remove = jest.spyOn(target, 'removeEventListener');

        manager.addEventListener(target, 'click', jest.fn(), true).cancel();

        expect(add).toHaveBeenCalledWith('click', expect.any(Function), { capture: true });
        expect(remove).toHaveBeenCalledWith('click', expect.any(Function), { capture: true });
      });

      it('should not call the callback when canceled', () => {
        const callback = createCallback<[Event]>();

        manager.addEventListener(target, 'click', callback).cancel();
        target.dispatchEvent(new Event('click'));

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback after disconnect', () => {
        const callback = createCallback<[Event]>();

        manager.addEventListener(target, 'click', callback);
        manager.disconnect();
        target.dispatchEvent(new Event('click'));

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it("should not try to remove the listener when canceled after a 'once' event", () => {
        const remove = jest.spyOn(target, 'removeEventListener');
        const effect = manager.addEventListener(target, 'click', jest.fn(), { once: true });

        target.dispatchEvent(new Event('click'));
        expect(remove).toHaveBeenCalledTimes(1);

        effect.cancel();
        expect(remove).toHaveBeenCalledTimes(1);
      });
    });

    describe('setTimeout', () => {
      it('should call the callback after the specified delay', () => {
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
        const callback = createCallback();

        manager.setTimeout(callback, 2).cancel();
        jest.advanceTimersByTime(4);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback after disconnect', () => {
        const callback = createCallback();

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
      it('should call the callback repeatedly', () => {
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
        const callback = createCallback();
        const effect = manager.setInterval(callback, 2);

        jest.advanceTimersByTime(2);
        effect.cancel();
        jest.advanceTimersByTime(4);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback after disconnect', () => {
        const callback = createCallback();

        manager.setInterval(callback, 2);
        manager.disconnect();
        jest.advanceTimersByTime(4);

        expect(callback).not.toHaveBeenCalled();
      });
    });

    describe('requestAnimationFrame', () => {
      beforeEach(() => {
        // The mock document's animation frames are not driven by Jest's fake timers.
        jest
          .spyOn(globalThis, 'requestAnimationFrame')
          .mockImplementation(callback =>
            Number(globalThis.setTimeout(() => callback(Date.now()), 16)),
          );
        jest
          .spyOn(globalThis, 'cancelAnimationFrame')
          .mockImplementation(id => globalThis.clearTimeout(id));
      });

      it('should call the callback on the next frame', () => {
        const callback = createCallback<[DOMHighResTimeStamp]>();

        manager.requestAnimationFrame(callback);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(1);

        jest.runOnlyPendingTimers();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(expect.any(Number));
        expect(callback.mock.results[0].value).toBe(context);
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback when canceled', () => {
        const callback = createCallback<[DOMHighResTimeStamp]>();

        manager.requestAnimationFrame(callback).cancel();
        jest.runOnlyPendingTimers();

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback after disconnect', () => {
        const callback = createCallback<[DOMHighResTimeStamp]>();

        manager.requestAnimationFrame(callback);
        manager.disconnect();
        jest.runOnlyPendingTimers();

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not try to cancel the frame when canceled after completion', () => {
        const cancel = jest.spyOn(globalThis, 'cancelAnimationFrame');
        const effect = manager.requestAnimationFrame(jest.fn());

        jest.runOnlyPendingTimers();
        effect.cancel();

        expect(cancel).not.toHaveBeenCalled();
      });

      it('should return an inert effect when `requestAnimationFrame` is not supported', () => {
        const callback = createCallback<[DOMHighResTimeStamp]>();

        const spy = jest.spyOn(globalThis, 'requestAnimationFrame');
        delete spy['requestAnimationFrame'];

        manager.requestAnimationFrame(callback).cancel();
        expect(manager.activeEffects).toBe(0);

        jest.runOnlyPendingTimers();
        expect(callback).not.toHaveBeenCalled();
      });
    });

    describe('debounce', () => {
      it('should only call the callback once with the latest arguments', () => {
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
        const callback = createCallback();
        const debounced = manager.debounce(callback, 2);

        debounced();
        manager.disconnect();
        jest.advanceTimersByTime(2);

        expect(callback).not.toHaveBeenCalled();
      });
    });

    describe('throttle', () => {
      it('should call the callback immediately, then once more with the latest arguments', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2);

        throttled(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(1);
        expect(manager.activeEffects).toBe(1);

        throttled(2);
        jest.advanceTimersByTime(1);
        throttled(3);

        expect(callback).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(3);
        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(manager.activeEffects).toBe(0);

        for (const result of callback.mock.results) {
          expect(result.value).toBe(context);
        }
      });

      it('should not call the callback on the trailing edge when called only once', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2);

        throttled(1);
        jest.advanceTimersByTime(4);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should be reusable after the throttle window has ended', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2);

        for (let i = 1; i <= 3; i++) {
          throttled(i);

          expect(callback).toHaveBeenCalledTimes(i);
          expect(callback).toHaveBeenLastCalledWith(i);
          expect(manager.activeEffects).toBe(1);

          jest.advanceTimersByTime(2);
          expect(manager.activeEffects).toBe(0);
        }
      });

      it('should only call the callback at the end of the window when `leading` is disabled', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2, { leading: false });

        throttled(1);
        jest.advanceTimersByTime(1);
        throttled(2);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(2);
        expect(callback.mock.results[0].value).toBe(context);

        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should ignore calls during the window when `trailing` is disabled', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2, { trailing: false });

        throttled(1);
        jest.advanceTimersByTime(1);
        throttled(2);
        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should not call the callback when canceled', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2);

        throttled(1);
        throttled(2);
        throttled.cancel();
        jest.advanceTimersByTime(4);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should call the callback immediately again after being canceled', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2);

        throttled(1);
        throttled.cancel();
        throttled(2);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(2);
        expect(manager.activeEffects).toBe(1);
      });

      it('should not call the callback after disconnect', () => {
        const callback = createCallback<[number]>();
        const throttled = manager.throttle(callback, 2);

        throttled(1);
        throttled(2);
        manager.disconnect();
        jest.advanceTimersByTime(4);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });
    });
  });
});
