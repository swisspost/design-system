export const MIGRATION_TYPE = 'post:migration_type';
export const MIGRATION_CHECKS_KEY = 'post:migration_checks';

export function getLocaleStorage(key: string): string | null {
  const value = window.localStorage.getItem(key);
  return !value ? null : JSON.parse(value);
}

export function setLocaleStorage(key: string, value: unknown): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}
