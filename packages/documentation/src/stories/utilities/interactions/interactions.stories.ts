import type { StoryObj, StoryFn, StoryContext } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '4b511e58-849e-4e2e-b2b4-2a90656553f4',
  title: 'Utilities/Interactions',
  tags: ['status:InProgress'],
  argTypes: {
    pointerEvents: {
      name: 'Pointer events',
      description: 'Sets the pointer events behavior. ',
      control: {
        type: 'radio',
      },
      options: ['auto', 'none'],
      table: {
        category: 'Pointer Events',
      },
    },
    userSelect: {
      name: 'User select',
      description: 'Sets the text selection behavior. ',
      control: {
        type: 'radio',
      },
      options: ['none', 'all', 'auto'],
      table: {
        category: 'User select',
      },
    },
  },
  args: {
    pointerEvents: 'none',
    userSelect: 'all',
  },
};

export default meta;

type Story = StoryObj;

export const PointerEvents: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return html`<div class="d-flex flex-column">${story(context.args, context)}</div>`;
    },
  ],
  render: () => html`
    <a href="#" class="pe-none"> This link cannot be clicked. </a>
    <a href="#" class="pe-auto"> This link can be clicked and accessed. </a>
  `,
};

export const UserSelect: Story = {
  render: () => html`
    <p class="user-select-all">Clicking here will select all of this text at once.</p>
    <p class="user-select-auto">
      This text can be selected. You can select a part of it or all of it.
    </p>
    <p class="user-select-none">This text cannot be selected.</p>
  `,
};
