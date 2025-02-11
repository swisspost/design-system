export function checkUrl(value: string | URL, error: string) {
  if (typeof value !== 'string' && !(value instanceof URL)) {
    throw new Error(error);
  }

  try {
    new URL(value, window.location.href);
  } catch {
    throw new Error(error);
  }
}
