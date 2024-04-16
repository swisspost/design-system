import { StoryContext, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

export function coloredBackground(story: StoryFn, context: StoryContext, color: string) {
  return html`
    <div class="bg-${color}" style="margin: -40px -30px; padding: 40px 30px;">
      ${story(context.args, context)}
    </div>
  `;
}
