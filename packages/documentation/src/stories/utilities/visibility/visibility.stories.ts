import type { Args, StoryObj } from '@storybook/web-components-vite';
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
      description: 'Control the visibility of the first box without affecting layout',
      control: { type: 'select' },
      options: visibilityOptions,
    },
  },
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="visibility-example">${story(args, context)}</div>
    `,
  ],
  render: (args: Args) => {
    return html`
      <div class="${args.visibility}">Box 1</div>
      <div>Box 2</div>
    `;
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
