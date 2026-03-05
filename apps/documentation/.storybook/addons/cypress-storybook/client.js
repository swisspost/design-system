// Source: https://github.com/NicholasBoll/cypress-storybook

import { addons } from '@storybook/preview-api';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { changeKnob, setCurrentStory } from './common';

window.__setCurrentStory = function (categorization, story) {
  setCurrentStory(categorization, story);
  forceReRender();
};

window.__changeKnob = function (changedKnob) {
  changeKnob(changedKnob);

  // force story to rerender with updated knob
  forceReRender();
};

function forceReRender() {
  addons.getChannel().emit(FORCE_RE_RENDER);
}
