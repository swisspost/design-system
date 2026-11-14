import 'jest';
import { Build } from '@stencil/core';

export function useBrowser() {
  jest.replaceProperty(Build, 'isBrowser', true);
  jest.replaceProperty(Build, 'isServer', false);
}

export function useServer() {
  jest.replaceProperty(Build, 'isBrowser', false);
  jest.replaceProperty(Build, 'isServer', true);
}
