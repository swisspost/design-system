import { HostElement } from '@stencil/core/internal';

/**
 * Invoke the `componentOnReady` method if it is available, simulate it otherwise
 * @see https://stenciljs.com/docs/api#componentonready
 */
export const componentOnReady = <T extends HostElement>(el: T): Promise<T> => {
  if (typeof el.componentOnReady === 'function') {
    return el.componentOnReady();
  } else {
    return new Promise(resolve =>
      customOnReady(() => {
        resolve(el);
      }),
    );
  }
};

const customOnReady = (callback: FrameRequestCallback) => {
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(callback);
  }

  return setTimeout(callback);
};
