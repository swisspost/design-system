import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'cd684d90-e7a7-41a9-8923-b1b72ad9b385',
  title: 'Components/Tooltip Trigger',
  tags: ['package:WebComponents'],
  component: 'post-tooltip-trigger',
  parameters: {
    badges: [],
    docs: {
      page: null,
    },
  },
  render: (args: Args) => {
    return html`
      <post-tooltip-trigger for="tooltip-delay-example" delay="${ifDefined(args.delay !== 0 ? args.delay : undefined)}">
        <button class="btn btn-secondary btn-large">Tooltip with delay</button>
      </post-tooltip-trigger>
      <post-tooltip id="tooltip-delay-example">
        This is the tooltip content
      </post-tooltip>
    `;
  },
  args: {
    for: 'tooltip-delay-example',
    delay: 300,
  },
  argTypes: {
    for: {
      name: 'for',
      description: 'ID of the tooltip element that this trigger is linked to.',
      control: false,
      table: {
        category: 'General',
        type: {
          summary: 'string',
        },
      },
    },
    delay: {
      name: 'delay',
      description: 'Delay (in milliseconds) before the tooltip is shown.',
      control: {
        type: 'number',
      },
      table: {
        category: 'General',
        type: {
          summary: 'number',
        },
      },
    },
  },
};

export default meta;
export const Default: StoryObj = {};