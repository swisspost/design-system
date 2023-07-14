import { create } from '@storybook/theming';

export const light = create({
  base: 'light',

  colorPrimary: '#333',
  colorSecondary: '#666',

  // UI
  appBg: '#faf9f8',
  appContentBg: '#fff',
  appBorderColor: '#999',
  appBorderRadius: 3,

  // Typography
  fontBase: '"Frutiger Neue For Post", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#000',
  textInverseColor: '#fff',
  textMutedColor: '#333',

  // Toolbar default and active colors
  barTextColor: '#999',
  barSelectedColor: '#000',
  barBg: '#fff',

  // Form colors
  inputBg: '#fff',
  inputBorder: '#666',
  inputTextColor: '#000',
  inputBorderRadius: 3,

  brandTitle: 'Swiss Post Design System',
  brandUrl: 'https://design-system.post.ch',
  brandImage: '/images/logo-swisspost.svg',
  brandTarget: '_self',
});

export const dark = create({
  base: 'dark',

  colorPrimary: '#333',
  colorSecondary: '#666',

  // UI
  appBg: '#222',
  appContentBg: '#333',
  appBorderColor: '#444',
  appBorderRadius: 3,

  // Typography
  fontBase: '"Frutiger Neue For Post", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#fff',
  textInverseColor: '#000',
  textMutedColor: '#aaa',

  // Toolbar default and active colors
  barTextColor: '#fff',
  barSelectedColor: '#fff',
  barBg: '#333',

  // Form colors
  inputBg: '#222',
  inputBorder: '#666',
  inputTextColor: '#fff',
  inputBorderRadius: 3,

  brandTitle: 'Swiss Post Design System',
  brandUrl: 'https://design-system.post.ch',
  brandImage: '/images/logo-swisspost.svg',
  brandTarget: '_self',
});

export default {
  light,
  dark,
};
