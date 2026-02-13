import { Build } from '@stencil/core';
const hasWindow = typeof window !== 'undefined';
export const IS_BROWSER: boolean = hasWindow && Build.isBrowser;
export const IS_SERVER: boolean = !hasWindow && Build.isServer;
