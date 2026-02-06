type LongPressOptions = {
  delayMs?: number;
  intervalMs?: number;
};

export function repeatOnLongPress(callback: () => void, options?: LongPressOptions) {
  const stop = repeat(callback, options);

  const handler = () => {
    stop();
    window.removeEventListener('pointerup', handler);
    window.removeEventListener('pointercancel', handler);
    window.removeEventListener('pointerleave', handler);
  };

  window.addEventListener('pointerup', handler);
  window.addEventListener('pointercancel', handler);
  window.addEventListener('pointerleave', handler);

  return stop;
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
