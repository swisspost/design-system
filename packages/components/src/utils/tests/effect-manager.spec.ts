import './matchers/toHaveBeenLastCalledOn';

import { EffectManager } from '@/utils/effect-manager';
import { useBrowser, useServer } from '@/utils/tests/helpers/stencil-build';
import { mockAnimationFrame } from '@/utils/tests/mocks/animation-frame';
import { MockResizeObserver, mockResizeObserver } from '@/utils/tests/mocks/resize-observer';
import { MockMutationObserver, mockMutationObserver } from '@/utils/tests/mocks/mutation-observer';

type MockObserver = MockResizeObserver | MockMutationObserver;
type MockObserverRecord = ResizeObserverEntry & MutationRecord;
type MockObserverOptions = ResizeObserverOptions & MutationObserverInit;

class Context {}

const OBSERVERS = [
  {
    api: 'ResizeObserver',
    method: 'createResizeObserver',
    Mock: MockResizeObserver,
    mock: mockResizeObserver,
  },
  {
    api: 'MutationObserver',
    method: 'createMutationObserver',
    Mock: MockMutationObserver,
    mock: mockMutationObserver,
  },
] as const;

function throwError(): never {
  throw new Error('Callback failed.');
}

describe('EffectManager', () => {
  let context: Context;
  let manager: EffectManager<Context>;
  let callback: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();

    context = new Context();
    manager = new EffectManager(context);
    callback = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('browser environment', () => {
    beforeEach(() => {
      useBrowser();
    });

    describe('addEventListener', () => {
      let target: HTMLElement;

      beforeEach(() => {
        target = document.createElement('div');
      });

      it('should call the callback every time the event is dispatched', () => {
        manager.addEventListener(target, 'click', callback);

        for (let i = 1; i <= 3; i++) {
          const event = new Event('click');
          target.dispatchEvent(event);

          expect(callback).toHaveBeenCalledTimes(i);
          expect(callback).toHaveBeenLastCalledWith(event);
          expect(callback).toHaveBeenLastCalledOn(context);
          expect(manager.activeEffects).toBe(1);
        }
      });

      it('should call the callback only once when the `once` option is set', () => {
        const event = new Event('click');

        manager.addEventListener(target, 'click', callback, { once: true });
        target.dispatchEvent(event);
        target.dispatchEvent(new Event('click'));

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(event);
        expect(manager.activeEffects).toBe(0);
      });

      it.each([
        { given: 'nothing', options: undefined, expected: {} },
        { given: 'a boolean', options: true, expected: { capture: true } },
        {
          given: 'an object',
          options: { capture: true, passive: true, once: true },
          expected: { capture: true, passive: true },
        },
      ])('should forward the native options when given $given', ({ options, expected }) => {
        const addSpy = jest.spyOn(target, 'addEventListener');
        const removeSpy = jest.spyOn(target, 'removeEventListener');

        manager.addEventListener(target, 'click', callback, options).cancel();

        expect(addSpy).toHaveBeenLastCalledWith('click', expect.any(Function), expected);
        expect(removeSpy).toHaveBeenLastCalledWith('click', addSpy.mock.calls[0][1], expected);
      });

      it('should remove the listener when cancelled', () => {
        manager.addEventListener(target, 'click', callback).cancel();
        target.dispatchEvent(new Event('click'));

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should do nothing when cancelled after completion', () => {
        const removeSpy = jest.spyOn(target, 'removeEventListener');
        const effect = manager.addEventListener(target, 'click', callback, { once: true });

        target.dispatchEvent(new Event('click'));
        effect.cancel();

        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should remove a `once` listener even when the callback throws', () => {
        callback.mockImplementation(throwError);

        manager.addEventListener(target, 'click', callback, { once: true });
        target.dispatchEvent(new Event('click'));
        target.dispatchEvent(new Event('click'));

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });
    });

    describe('setTimeout', () => {
      it('should call the callback once after the delay', () => {
        manager.setTimeout(callback, 2);
        jest.advanceTimersByTime(1);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(3);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith();
        expect(callback).toHaveBeenLastCalledOn(context);
        expect(manager.activeEffects).toBe(0);
      });

      it('should clear the timeout when cancelled', () => {
        manager.setTimeout(callback, 2).cancel();
        jest.advanceTimersByTime(2);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should do nothing when cancelled after completion', () => {
        const clearSpy = jest.spyOn(globalThis, 'clearTimeout');
        const effect = manager.setTimeout(callback, 2);

        jest.advanceTimersByTime(2);
        effect.cancel();

        expect(clearSpy).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should stop tracking the timeout even when the callback throws', () => {
        callback.mockImplementation(throwError);

        manager.setTimeout(callback, 2);

        expect(() => jest.advanceTimersByTime(2)).toThrow('Callback failed.');
        expect(manager.activeEffects).toBe(0);
      });
    });

    describe('setInterval', () => {
      it('should call the callback repeatedly at the interval', () => {
        manager.setInterval(callback, 2);

        for (let i = 1; i <= 3; i++) {
          jest.advanceTimersByTime(1);

          expect(callback).toHaveBeenCalledTimes(i - 1);

          jest.advanceTimersByTime(1);

          expect(callback).toHaveBeenCalledTimes(i);
          expect(callback).toHaveBeenLastCalledWith();
          expect(callback).toHaveBeenLastCalledOn(context);
          expect(manager.activeEffects).toBe(1);
        }
      });

      it('should clear the interval when cancelled', () => {
        const effect = manager.setInterval(callback, 2);

        jest.advanceTimersByTime(2);
        effect.cancel();
        jest.advanceTimersByTime(4);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });
    });

    describe('requestAnimationFrame', () => {
      beforeEach(() => {
        mockAnimationFrame();
      });

      it('should call the callback once on the next frame', () => {
        manager.requestAnimationFrame(callback);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(1);

        jest.runAllTimers();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(expect.any(Number));
        expect(callback).toHaveBeenLastCalledOn(context);
        expect(manager.activeEffects).toBe(0);
      });

      it('should cancel the frame request when cancelled', () => {
        manager.requestAnimationFrame(callback).cancel();
        jest.runAllTimers();

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should do nothing when cancelled after completion', () => {
        const effect = manager.requestAnimationFrame(callback);

        jest.runAllTimers();
        effect.cancel();

        expect(globalThis.cancelAnimationFrame).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should stop tracking the frame request even when the callback throws', () => {
        callback.mockImplementation(throwError);

        manager.requestAnimationFrame(callback);

        expect(() => jest.runAllTimers()).toThrow('Callback failed.');
        expect(manager.activeEffects).toBe(0);
      });
    });

    describe('debounce', () => {
      it('should call the callback once with the latest arguments after the delay since the last call', () => {
        const debounced = manager.debounce(callback, 2);

        for (let i = 1; i <= 3; i++) {
          debounced(i);
          jest.advanceTimersByTime(1);

          expect(callback).not.toHaveBeenCalled();
          expect(manager.activeEffects).toBe(1);
        }

        jest.advanceTimersByTime(3);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(3);
        expect(callback).toHaveBeenLastCalledOn(context);
        expect(manager.activeEffects).toBe(0);
      });

      it('should call the callback again when called after the delay has elapsed', () => {
        const debounced = manager.debounce(callback, 2);

        debounced(1);
        jest.advanceTimersByTime(2);
        debounced(2);

        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(2);
        expect(manager.activeEffects).toBe(0);
      });

      it('should track a call made from within the callback', () => {
        const debounced = manager.debounce((n: number) => {
          callback(n);
          if (n === 1) debounced(2);
        }, 2);

        debounced(1);
        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(1);

        debounced.cancel();
        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should cancel the pending call when cancelled', () => {
        const debounced = manager.debounce(callback, 2);

        debounced(1);
        debounced.cancel();
        jest.advanceTimersByTime(2);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should do nothing when cancelled after completion', () => {
        const clearSpy = jest.spyOn(globalThis, 'clearTimeout');
        const debounced = manager.debounce(callback, 2);

        debounced(1);
        jest.advanceTimersByTime(2);
        debounced.cancel();

        expect(clearSpy).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should stop tracking the pending call even when the callback throws', () => {
        callback.mockImplementation(throwError);

        manager.debounce(callback, 2)(1);

        expect(() => jest.advanceTimersByTime(2)).toThrow('Callback failed.');
        expect(manager.activeEffects).toBe(0);
      });
    });

    describe('throttle', () => {
      it('should call the callback immediately, then with the latest arguments at the end of the interval', () => {
        const throttled = manager.throttle(callback, 2);

        throttled(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(1);
        expect(callback).toHaveBeenLastCalledOn(context);
        expect(manager.activeEffects).toBe(1);

        throttled(2);
        jest.advanceTimersByTime(1);
        throttled(3);

        expect(callback).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(3);
        expect(callback).toHaveBeenLastCalledOn(context);

        // The trailing call starts a new interval, which ends without a call if not called again.
        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(manager.activeEffects).toBe(0);
      });

      it('should call the callback immediately again when called after the interval has elapsed', () => {
        const throttled = manager.throttle(callback, 2);

        throttled(1);
        jest.advanceTimersByTime(2);

        expect(manager.activeEffects).toBe(0);

        throttled(2);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(2);
        expect(manager.activeEffects).toBe(1);
      });

      it('should only call the callback at the end of the interval when `leading` is disabled', () => {
        const throttled = manager.throttle(callback, 2, { leading: false });

        throttled(1);
        jest.advanceTimersByTime(1);
        throttled(2);

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(2);
        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should ignore calls during the interval when `trailing` is disabled', () => {
        const throttled = manager.throttle(callback, 2, { trailing: false });

        throttled(1);
        jest.advanceTimersByTime(1);
        throttled(2);
        jest.advanceTimersByTime(1);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should cancel the pending call and reset the interval when cancelled', () => {
        const throttled = manager.throttle(callback, 2);

        throttled(1);
        throttled(2);
        throttled.cancel();
        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);

        throttled(3);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(3);
        expect(manager.activeEffects).toBe(1);
      });

      it('should do nothing when cancelled after completion', () => {
        const clearSpy = jest.spyOn(globalThis, 'clearTimeout');
        const throttled = manager.throttle(callback, 2);

        throttled(1);
        jest.advanceTimersByTime(2);
        throttled.cancel();

        expect(clearSpy).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });
    });

    describe.each(OBSERVERS)('$method', ({ method, Mock, mock }) => {
      let observeSpy: jest.SpiedFunction<MockObserver['observe']>;
      let disconnectSpy: jest.SpiedFunction<MockObserver['disconnect']>;
      let observer: MockObserver;

      beforeEach(() => {
        mock();

        // Spy on the prototype, as the manager replaces the methods of the instance.
        observeSpy = jest.spyOn(Mock.prototype, 'observe');
        disconnectSpy = jest.spyOn(Mock.prototype, 'disconnect');
        observer = manager[method](callback) as MockObserver;
      });

      it('should call the callback with the native arguments when triggered', () => {
        const records = [{ target: document.body }] as unknown as MockObserverRecord[];

        observer.observe(document.body);
        observer.trigger(records);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(records, observer);
        expect(callback).toHaveBeenLastCalledOn(context);
      });

      it('should start tracking the observer once it observes a target', () => {
        const options = { box: 'border-box', childList: true } as MockObserverOptions;

        expect(manager.activeEffects).toBe(0);

        for (let i = 1; i <= 2; i++) {
          const target = document.createElement('div');
          observer.observe(target, options);

          expect(observeSpy).toHaveBeenCalledTimes(i);
          expect(observeSpy).toHaveBeenLastCalledWith(target, options);
          expect(manager.activeEffects).toBe(1);
        }
      });

      it('should disconnect the native observer when disconnected', () => {
        observer.observe(document.body);
        observer.disconnect();

        expect(disconnectSpy).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should disconnect the native observer when disconnected before observing', () => {
        observer.disconnect();

        expect(disconnectSpy).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should track the observer again when observing after being disconnected', () => {
        observer.observe(document.body);
        observer.disconnect();
        observer.observe(document.body);

        expect(observeSpy).toHaveBeenCalledTimes(2);
        expect(manager.activeEffects).toBe(1);
      });
    });

    describe('disconnect', () => {
      it('should tear down all tracked effects', () => {
        mockAnimationFrame();
        mockResizeObserver();
        mockMutationObserver();

        const target = document.createElement('div');
        const resizeDisconnectSpy = jest.spyOn(MockResizeObserver.prototype, 'disconnect');
        const mutationDisconnectSpy = jest.spyOn(MockMutationObserver.prototype, 'disconnect');

        manager.addEventListener(target, 'click', callback);
        manager.setTimeout(callback, 2);
        manager.setInterval(callback, 2);
        manager.requestAnimationFrame(callback);
        manager.debounce(callback, 2)();
        manager.throttle(callback, 2, { leading: false })();
        manager.createResizeObserver(callback).observe(target);
        manager.createMutationObserver(callback).observe(target);

        expect(manager.activeEffects).toBe(8);

        manager.disconnect();
        target.dispatchEvent(new Event('click'));
        jest.runAllTimers();

        expect(callback).not.toHaveBeenCalled();
        expect(resizeDisconnectSpy).toHaveBeenCalledTimes(1);
        expect(mutationDisconnectSpy).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should tear down all tracked effects and throw an aggregate error when teardowns fail', () => {
        const errors = [new Error('first'), new Error('second')];
        const target = document.createElement('div');

        for (const error of errors) {
          const failingTarget = document.createElement('div');

          jest.spyOn(failingTarget, 'removeEventListener').mockImplementation(() => {
            throw error;
          });
          manager.addEventListener(failingTarget, 'click', jest.fn());
        }

        manager.addEventListener(target, 'click', callback);

        expect(() => manager.disconnect()).toThrow(
          expect.objectContaining({ name: 'AggregateError', errors }),
        );

        target.dispatchEvent(new Event('click'));

        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      });

      it('should not tear down effects tracked during teardown', () => {
        const target = document.createElement('div');

        jest.spyOn(target, 'removeEventListener').mockImplementation(() => {
          manager.setTimeout(callback, 2);
        });

        manager.addEventListener(target, 'click', jest.fn());
        manager.disconnect();

        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });

      it('should keep the manager usable after being disconnected', () => {
        manager.setTimeout(jest.fn(), 2);
        manager.disconnect();
        manager.setTimeout(callback, 2);

        expect(manager.activeEffects).toBe(1);

        jest.advanceTimersByTime(2);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(manager.activeEffects).toBe(0);
      });
    });
  });

  describe('server environment', () => {
    beforeEach(() => {
      useServer();
    });

    it('should not add a native event listener with addEventListener', () => {
      const target = document.createElement('div');
      const addSpy = jest.spyOn(target, 'addEventListener');

      manager.addEventListener(target, 'click', callback).cancel();

      expect(addSpy).not.toHaveBeenCalled();
      expect(manager.activeEffects).toBe(0);
    });

    it.each(['setTimeout', 'setInterval'] as const)(
      'should not schedule a native timer with %s',
      method => {
        const nativeSpy = jest.spyOn(globalThis, method);

        manager[method](callback, 2).cancel();

        expect(nativeSpy).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      },
    );

    it('should not request a native animation frame with requestAnimationFrame', () => {
      mockAnimationFrame();

      manager.requestAnimationFrame(callback).cancel();

      expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
      expect(manager.activeEffects).toBe(0);
    });

    it.each(['debounce', 'throttle'] as const)(
      'should not schedule a native timer with %s',
      method => {
        const nativeSpy = jest.spyOn(globalThis, 'setTimeout');
        const callable = manager[method](callback, 2);

        callable();
        callable.cancel();

        expect(nativeSpy).not.toHaveBeenCalled();
        expect(callback).not.toHaveBeenCalled();
        expect(manager.activeEffects).toBe(0);
      },
    );

    it.each(OBSERVERS)('should not create a native $api with $method', ({ api, method, mock }) => {
      mock();

      const nativeSpy = jest.spyOn(globalThis, api);
      const observer = manager[method](callback);

      observer.observe(document.body);
      observer.disconnect();

      expect(nativeSpy).not.toHaveBeenCalled();
      expect(manager.activeEffects).toBe(0);
    });
  });
});
