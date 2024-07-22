import { debounce } from '../debounce';

const timeout = 50;

describe('debounce', () => {
  let callback: jest.MockedFn<(...args: unknown[]) => void>;
  let debouncedCallback: (...args: unknown[]) => void;

  beforeEach(() => {
    callback = jest.fn();
    debouncedCallback = debounce(callback, timeout);
  });

  it('should wait until the provided timeout elapses before executing the callback function', done => {
    debouncedCallback();

    setTimeout(() => {
      expect(callback).not.toHaveBeenCalled();
    }, timeout / 2);

    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
      done();
    }, timeout * 2);
  });

  it('should only execute the callback function once when the timeout elapses', done => {
    debouncedCallback();
    debouncedCallback();
    debouncedCallback();

    setTimeout(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      done();
    }, timeout * 2);
  });

  it('should pass all provided arguments to the callback function', done => {
    const args = [25, 'myArg', false];

    debouncedCallback(...args);

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(...args);
      done();
    }, timeout * 2);
  });
});
