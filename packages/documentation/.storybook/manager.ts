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

let hasEventListenerOnDeleteBtn = false;

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

  addRecentlyOpenedClearBtnLabel();

  // Add a listener to the search input, as the clear button gets removed from the DOM when it is filled
  document
    .querySelector('#storybook-explorer-searchfield')
    ?.addEventListener('input', (e: Event) => {
      if ((e.target as HTMLInputElement)?.value === '') {
        // If input is emptied, the clear button should be back on the DOM and the label needs to be reattached to it
        setTimeout(() => {
          addRecentlyOpenedClearBtnLabel();
        }, 0);
      }

      // When input is filled, the clear button of that input appears and an event listener should be added to it
      if (!hasEventListenerOnDeleteBtn) {
        hasEventListenerOnDeleteBtn = true;
        document
          .querySelector('#storybook-explorer-searchfield + div > button:first-child')
          ?.addEventListener('click', (e: Event) => {
            // When the clear button of the input is clicked, the clear button of the recently opened should be back in the DOM
            setTimeout(() => {
              addRecentlyOpenedClearBtnLabel();
            }, 0);
          });
      }
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

/**
 * Adds a label to the "Clear history of recently opened" button in the sidebar
 */
function addRecentlyOpenedClearBtnLabel() {
  hasEventListenerOnDeleteBtn = false;

  // Create a visually hidden label
  let label = document.createElement('span');
  label.classList.add('visually-hidden');
  let labelText = document.createTextNode('Clear history of recently opened pages');
  label.appendChild(labelText);

  // Add it to the button
  document.querySelector('.search-result-recentlyOpened-clear')?.appendChild(label);
}
