// It seems like the package '@oddbird/popover-polyfill does not properly declare it's types.
// This file fixes that issue so typescript does not complain about it on the import line

declare module '@oddbird/popover-polyfill/dist/popover-fn.js' {
  export {
    apply,
    injectStyles,
    isPolyfilled,
    isSupported,
  } from '../node_modules/@oddbird/popover-polyfill/dist/popover-fn.js';
}
