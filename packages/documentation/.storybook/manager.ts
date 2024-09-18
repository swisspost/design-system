import { addons } from '@storybook/manager-api';
import { defineCustomElement as definePostIcon } from '@swisspost/design-system-components/dist/components/post-icon.js';
import themes from './styles/themes';

definePostIcon();

if (process.env.NODE_ENV) document.documentElement.setAttribute('data-env', process.env.NODE_ENV);

addons.setConfig({
  panelPosition: 'right',
  theme: themes.light,
  sidebar: {
    collapsedRoots: [],
  },

  // the toolbar is only visible in the fill screen view after clicking "View full screen" on a story
  toolbar: {
    remount: { hidden: true }, // controls the visibility of the "Remount component" button
    zoom: { hidden: true }, // controls the visibility of the "Zoom in", "Zoom out", and "Reset zoom" buttons
    addons: { hidden: true }, // controls the visibility of the "Show addons" button
    fullscreen: { hidden: true }, // controls the visibility of the "Go full screen" button
    eject: { hidden: true }, // controls the visibility of the "Open canvas in new tab" button
    copy: { hidden: true }, // controls the visibility of the "Copy canvas link" button
  },
});
