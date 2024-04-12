export const MIGRATION_TYPE: string = 'post:migration_type';
export const MIGRATION_CHECKS_KEY: string = 'post:migration_checks';

export function getLocaleStorage(key: string): any | null {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export function setLocaleStorage(key: string, value: any): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}
