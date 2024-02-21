// Source: https://github.com/NicholasBoll/cypress-storybook

import { addons } from '@storybook/preview-api';
import Events from '@storybook/core-events';

// Collect actions emitted by storybook/addon-actions
window.__actions = {};
// Track current story Id - this means `loadStory` must be used for some commands to work properly
window.__storyId = null;

/**
 * Remove punctuation and illegal characters from a story ID.
 *
 * See https://gist.github.com/davidjrice/9d2af51100e41c6c4b4a
 */
function sanitize(string) {
  return (
    string
      .toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  );
}

function sanitizeSafe(string, part) {
  const sanitized = sanitize(string);
  if (sanitized === '') {
    throw new Error('Invalid ' + part + " '" + string + "', must include alphanumeric characters");
  }
  return sanitized;
}

/**
 * Generate a storybook ID from a component/kind and story name.
 * This is a copy from https://github.com/storybookjs/csf/blob/next/src/index.ts
 * to be able to support storybook 6.x since they moved toId from storybook/router to storybook/csf
 */
export function toId(kind, name) {
  return sanitizeSafe(kind, 'kind') + '--' + sanitizeSafe(name, 'name');
}

function resetKnobs() {
  addons.getChannel().emit('storybookjs/knobs/reset');
}

export function setCurrentStory(categorization, story) {
  resetKnobs();
  resetActions();
  window.__storyId = toId(categorization, story);
  addons.getChannel().emit(Events.SET_CURRENT_STORY, {
    storyId: window.__storyId,
  });
  addons.getChannel().emit('storybookjs/knobs/reset');
}

export function changeKnob(changedKnob) {
  addons.getChannel().emit('storybookjs/knobs/change', changedKnob);
}

export function changeArg(updatedArgs) {
  console.log(updatedArgs);
  addons.getChannel().emit(Events.UPDATE_STORY_ARGS, {
    storyId: window.__storyId,
    updatedArgs: updatedArgs,
  });
}

addons.getChannel().addListener('storybook/actions/action-event', function (action) {
  if (window.Cypress) {
    if (!window.__actions[action.data.name]) {
      window.__actions[action.data.name] = window.Cypress.sinon.spy();
    }

    window.__actions[action.data.name](action.data.args);
  }
});

export function resetActions() {
  window.__actions = {};
}

window.__changeArg = changeArg;
