import { addons } from 'storybook/manager-api';
import { defineCustomElementPostIcon } from '@swisspost/design-system-components/components';
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

defineCustomElementPostIcon();

const storedDevMode = localStorage.getItem('devModeEnabled');

let initialEnv = process.env.NODE_ENV || 'production';

if (storedDevMode !== null) {
  initialEnv = JSON.parse(storedDevMode) ? 'development' : 'production';
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
