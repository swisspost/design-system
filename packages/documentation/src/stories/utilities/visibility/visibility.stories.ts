import type { Args, StoryObj, StoryFn, StoryContext } from '@storybook/web-components-vite';
import { html } from 'lit';
import './visibility.styles.scss';
import { MetaExtended } from '@root/types';

const visibilityOptions = ['visible', 'invisible'];

const meta: MetaExtended = {
  id: 'd4c25c91-7e7d-4e39-8e14-09c92e34a3b6',
  title: 'Utilities/Visibility',
  args: {
    visibility: 'visible',
  },
  argTypes: {
    visibility: {
      name: 'visibility',
      description: 'Control the visibility of the middle box without affecting layout',
      control: { type: 'select' },
      options: visibilityOptions,
    },
  },
  render: (args: Args) => {
    return html`
      <div class="visibility-example" style="display: flex; gap: 1rem;">
        <div class="visibility-box">Box 1</div>
        <div class="visibility-box ${args.visibility}">Box 2</div>
        <div class="visibility-box">Box 3</div>
      </div>
    `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return html`<div class="visibility-wrapper">${story(context.args, context)}</div>`;
    },
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
