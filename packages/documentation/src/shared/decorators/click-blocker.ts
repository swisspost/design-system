import type { StoryContext, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

export function clickBlocker(story: StoryFn, context: StoryContext) {
  return html`
    <div @click=${(e: Event) => e.preventDefault()}>${story(context.args, context)}</div>
  `;
}
