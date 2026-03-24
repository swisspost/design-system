import { IS_BROWSER } from './environment';

type LongPressOptions = {
  delayMs?: number;
  intervalMs?: number;
};

export function repeatOnLongPress(callback: () => void, options?: LongPressOptions) {
  const stop = repeat(callback, options);

  const handler = () => {
    stop();
    if (IS_BROWSER) {
      globalThis.removeEventListener('pointerup', handler);
      globalThis.removeEventListener('pointercancel', handler);
      globalThis.removeEventListener('pointerleave', handler);
    }
  };

  if (IS_BROWSER) {
    globalThis.addEventListener('pointerup', handler);
    globalThis.addEventListener('pointercancel', handler);
    globalThis.addEventListener('pointerleave', handler);
  }
}

function repeat(
  callback: () => void,
  { delayMs = 300, intervalMs = 100 }: LongPressOptions = {},
): () => void {
  callback(); // immediate action

  let intervalId: ReturnType<typeof setInterval>;

  const timeoutId = setTimeout(() => {
    intervalId = setInterval(callback, intervalMs);
  }, delayMs);

  return () => {
    clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);
  };
}
