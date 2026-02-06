import { repeatOnLongPress } from '../repeat-on-long-press';

describe('repeatOnLongPress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('calls the callback immediately', () => {
    const callback = jest.fn();

    repeatOnLongPress(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('starts repeating after the default delay, at the default interval', () => {
    const callback = jest.fn();

    repeatOnLongPress(callback);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(299);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(3 * 100);
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('uses custom delayMs and intervalMs when provided', () => {
    const callback = jest.fn();

    repeatOnLongPress(callback, { delayMs: 500, intervalMs: 200 });

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(499);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(2 * 200);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('stops repeating when the returned stop function is called', () => {
    const callback = jest.fn();

    const stop = repeatOnLongPress(callback, { delayMs: 300, intervalMs: 100 });

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(300 + 100);
    expect(callback).toHaveBeenCalledTimes(2);

    stop();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('registers pointer event listeners on window', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    const callback = jest.fn();
    repeatOnLongPress(callback);

    expect(addEventListenerSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('pointercancel', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('pointerleave', expect.any(Function));
  });

  it('removes pointer listeners and stops repeating on pointerup', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const callback = jest.fn();

    repeatOnLongPress(callback, { delayMs: 200, intervalMs: 100 });

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(200 + 100);
    expect(callback).toHaveBeenCalledTimes(2);

    window.dispatchEvent(new Event('pointerup'));

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('pointercancel', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerleave', expect.any(Function));
  });

  it('also stops repeating on pointercancel and pointerleave', () => {
    const callback = jest.fn();

    repeatOnLongPress(callback, { delayMs: 50, intervalMs: 50 });

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(50 + 50);
    expect(callback).toHaveBeenCalledTimes(2);

    window.dispatchEvent(new Event('pointercancel'));

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.clearAllTimers();
    const callback2 = jest.fn();
    repeatOnLongPress(callback2, { delayMs: 50, intervalMs: 50 });

    expect(callback2).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(50 + 50);
    expect(callback2).toHaveBeenCalledTimes(2);

    window.dispatchEvent(new Event('pointerleave'));
    jest.advanceTimersByTime(500);
    expect(callback2).toHaveBeenCalledTimes(2);
  });
});
