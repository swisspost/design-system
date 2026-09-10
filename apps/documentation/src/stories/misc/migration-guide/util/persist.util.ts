export const MIGRATION_TYPE = 'post:migration_type';
export const MIGRATION_CHECKS_KEY_V4 = 'post:migration_checks_v4';
export const MIGRATION_CHECKS_KEY_V9 = 'post:migration_checks_v9';

export function getLocaleStorage<T>(key: string): T | null {
  const value = window.localStorage.getItem(key);
  return !value ? null : JSON.parse(value);
}

export function setLocaleStorage(key: string, value: unknown): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function _restorePersistedState<T>(key: string): T | null {
  const stateTypeFromLocalStorage = getLocaleStorage<T>(key);
  return stateTypeFromLocalStorage ? stateTypeFromLocalStorage : null;
}
