import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#333',
  colorSecondary: '#666',

  // UI
  appBg: '#faf9f8',
  appContentBg: '#faf9f8',
  appBorderColor: '#999',
  appBorderRadius: 3,

  // Typography
  fontBase: '"Frutiger Neue For Post", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#000',
  textInverseColor: '#fff',

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
  brandImage: './logo-die-post.svg',
  brandTarget: '_self'
});