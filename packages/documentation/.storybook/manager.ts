import { addons } from 'storybook/manager-api';
import { defineCustomElement as definePostIcon } from '@swisspost/design-system-components/dist/components/post-icon.js';
import themes from './styles/themes';
import cssIcon from '../public/assets/images/sidebar-icons/css.svg';
import webComponentsIcon from '../public/assets/images/sidebar-icons/web_component.svg';
import React from 'react';
import { API_HashEntry, API_PreparedIndexEntry, StatusByTypeId } from 'storybook/internal/types';

const TECH_ICONS: Record<string, string> = {
  Styles: cssIcon,
  WebComponents: webComponentsIcon,
  InternetHeader: webComponentsIcon,
};

definePostIcon();

// Get existing URL params
const params = new URLSearchParams(window.location.search);

// Get value, that states if URL devMode is enabled (String 'true' or 'false', or null if the item is not specified in URL)
const devModeFromUrl = params.get('devModeEnabled');

// Get value, that states if localStorage devMode is enabled (String 'true' or 'false', or null if the item is not specified in localStorage)
const storedDevMode = localStorage.getItem('devModeEnabled');

// Get initial mode (e.g. `development` or `production` from environment variable), sets fallback to 'production')
let initialEnv = process.env.NODE_ENV || 'production';

// Override initialEnv by priority (url param is more important than the stored state)
if (devModeFromUrl !== null) {
  // Set devMode in localStorage based on URL parameter
  localStorage.setItem('devModeEnabled', devModeFromUrl);
  initialEnv = JSON.parse(devModeFromUrl) ? 'development' : 'production';
} else {
  // If no URL param, check if there's a stored devMode
  if (storedDevMode !== null) {
    // If the stored devModeEnabled is 'true', reset to 'production'
    localStorage.removeItem('devModeEnabled');
  }

  // Default to 'production' if no URL param and no stored value
  initialEnv = 'production';
}

// In case of no URL parameter, reset localStorage value (fallback)
if (devModeFromUrl === null) {
  // We clear only localStorage if it's set to 'development' (to reset it when switching back to production)
  if (storedDevMode === 'true') {
    localStorage.removeItem('devModeEnabled');
  }
}

document.documentElement.setAttribute('data-env', initialEnv);

// Filter functions
const excludeDevOnlyFilter = (
  item: API_PreparedIndexEntry & { statuses: StatusByTypeId },
): boolean => !(item.tags ?? []).includes('devOnly');
const includeAllFilter = () => true;

// Get the initial filter state from data-env
const initialDevMode = document.documentElement.getAttribute('data-env') === 'development';
const currentFilterFunction = initialDevMode ? includeAllFilter : excludeDevOnlyFilter;

const renderLabel = (item: API_HashEntry) => {
  if (item.type !== 'story' && item.type !== 'docs') {
    return item.name;
  }

  // Only show icons in development mode
  if (document.documentElement.getAttribute('data-env') !== 'development') {
    return item.name;
  }

  const tags = item.tags || [];
  const packageTags = tags.filter(tag => tag.startsWith('package:'));

  if (packageTags.length > 0) {
    const icons = packageTags
      .map(tag => tag.substring(8))
      .filter(packageType => TECH_ICONS[packageType])
      .map(packageType =>
        React.createElement('img', {
          key: packageType,
          src: TECH_ICONS[packageType],
          alt: packageType,
        }),
      );

    if (icons.length > 0) {
      return React.createElement(
        'span',
        { className: 'label-with-icon' },
        React.createElement('span', null, item.name),
        ...icons,
      );
    }
  }

  return item.name;
};

// Function to update filters in the Storybook sidebar configuration
const applyFilter = () => {
  addons.setConfig({
    sidebar: {
      filters: {
        patterns: currentFilterFunction,
      },
      renderLabel: renderLabel,
    },
  });
  window.location.reload();
};

// Initial Storybook UI config
addons.setConfig({
  panelPosition: 'right',
  theme: themes.light,
  sidebar: {
    collapsedRoots: [
      'getting-started',
      'packages',
      'foundations',
      'layout',
      'raw-components',
      'components',
      'utilities',
      'templates',
      'guidelines',
      'accessibility-practices',
    ],
    filters: {
      patterns: currentFilterFunction,
    },
    renderLabel: renderLabel,
  },
  toolbar: {
    remount: { hidden: true }, // controls the visibility of the "Remount component" button
    zoom: { hidden: true }, // controls the visibility of the "Zoom in", "Zoom out", and "Reset zoom" buttons
    addons: { hidden: true }, // controls the visibility of the "Show addons" button
    fullscreen: { hidden: true }, // controls the visibility of the "Go full screen" button
    eject: { hidden: true }, // controls the visibility of the "Open canvas in new tab" button
    copy: { hidden: true }, // controls the visibility of the "Copy canvas link" button
  },
});

// Watch for data-env changes
new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.attributeName === 'data-env') {
      const isDevMode = document.documentElement.getAttribute('data-env') === 'development';
      localStorage.setItem('devModeEnabled', JSON.stringify(isDevMode));
      applyFilter();
    }
  });
}).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-env'],
});
