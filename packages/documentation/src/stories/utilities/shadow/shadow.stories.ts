import type { Args, StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import './shadow.styles.scss';
import { MetaExtended } from '@root/types';

export const ShadowLabels: { [key: string]: string } = {
  'shadow': 'Default shadow',
  'shadow-sm': 'Small shadow',
  'shadow-lg': 'Large shadow',
  'shadow-none': 'No shadow',
};

const meta: MetaExtended = {
  id: '69f2b7e0-827d-4a7a-8580-5ff46dac276d',
  title: 'Utilities/Shadow',
  args: {
    shadow: 'shadow',
  },
  argTypes: {
    shadow: {
      name: 'Shadow',
      description: 'Size of the shadow',
      control: {
        type: 'select',
        labels: ShadowLabels,
      },
      options: ['shadow', 'shadow-sm', 'shadow-lg', 'shadow-none'],
      table: {
        category: 'General',
      },
    },
  },
  render: (args: Args) => {
    return html` <div class="${args.shadow}">${ShadowLabels[args.shadow]}</div> `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`<div class="shadow-example">${story(context.args, context)}</div>`;
      return storyTemplate;
    },
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
