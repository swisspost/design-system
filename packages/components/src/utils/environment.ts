export const IS_SERVER: boolean = typeof window === 'undefined';
export const IS_BROWSER: boolean = !IS_SERVER;
