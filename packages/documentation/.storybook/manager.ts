import { addons } from '@storybook/manager-api';
import { defineCustomElement as definePostIcon } from '@swisspost/design-system-components/dist/components/post-icon.js';
import themes from './styles/themes';

definePostIcon();

if (process.env.NODE_ENV) document.documentElement.setAttribute('data-env', process.env.NODE_ENV);

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
    ],
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

/**
 * The storybook sidebar is not accessible as most of the links cannot be reached using keyboard navigation
 * This function removes the tabindex of -1 to all of the links and make them reachable using tabs
 *
 * Since the links are only added to the DOM once its parent accordion is opened,
 * we need to listen to those accordions opening to update the tabindex when the links appear
 */
setTimeout(() => {
  // Remove negative tabindex to all of the links already present in the sidebar
  addFocusToLinks();

  // Add listener on click event on all the root items
  document
    .querySelectorAll('.sidebar-container .sidebar-subheading button')
    ?.forEach(subheading => {
      subheading.addEventListener('click', (e: Event) => {
        // When a root item is opened, remove negative tabindex to all of its children
        if ((e.target as HTMLElement).ariaExpanded === 'false') {
          setTimeout(() => {
            addFocusToLinks();

            // If section has subfolders, we add an event listener and those subfolders parent
            document
              .querySelectorAll('.sidebar-container .sidebar-item button')
              ?.forEach(subfolder => {
                subfolder.addEventListener('click', ev => {
                  // When a subfolder item is opened, remove negative tabindex to all of its children
                  if ((ev.target as HTMLElement).ariaExpanded === 'false') {
                    setTimeout(() => {
                      addFocusToLinks();
                    }, 0);
                  }
                });
              });
          }, 0);
        }
      });
    });
}, 500);

function addFocusToLinks() {
  // Get all of the links and buttons that are not reachable by the keyboard
  document
    .querySelectorAll(
      '.sidebar-container a[tabindex="-1"], .sidebar-container button[tabindex="-1"]',
    )
    ?.forEach(link => link.setAttribute('tabindex', '0'));
}
