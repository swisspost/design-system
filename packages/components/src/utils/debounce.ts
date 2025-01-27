export function debounce<T extends unknown[]>(callback: (...args: T) => void, timeout = 200) {
  let id: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(callback, timeout, ...args);
  };
}
