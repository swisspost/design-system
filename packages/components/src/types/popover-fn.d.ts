// The package '@oddbird/popover-polyfill does not properly declare it's types (they're using wrong file names).
// This file fixes that issue so typescript does not complain about it on the import line

declare module '@oddbird/popover-polyfill/fn' {
  export {
    apply,
    injectStyles,
    isPolyfilled,
    isSupported,
  } from '@oddbird/popover-polyfill/dist/popover-fn.js';
}
