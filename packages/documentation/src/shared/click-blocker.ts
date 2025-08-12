import { StoryContext, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

// Click blocker decorator to prevent clicking on example links
export function clickBlocker(story: StoryFn, context: StoryContext) {
  // Generate a custom ID in case there are multiple click blockers on the page
  const id = crypto.randomUUID();
  setTimeout(() => {
    const div = document.getElementById(id);
    div?.addEventListener(
      'click',
      e => {
        e.stopPropagation();
        e.preventDefault();
      },
      { capture: true },
    );
  }, 0);

  return html` <div id="${id}">${story(context.args, context)}</div> `;
}
