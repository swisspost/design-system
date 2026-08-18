import { Args, StoryObj, StoryContext } from '@storybook/web-components-vite';
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
  args: {
    delay: 300,
  },
  argTypes: {
    for: {
      name: 'for',
      control: false,
    },
    delay: {
      name: 'delay',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args: Args, context: StoryContext) => {
    const tooltipId = `tooltip-${context.id}`;

    return html`
      <post-tooltip-trigger
        for=${tooltipId}
        delay="${ifDefined(args.delay !== 0 ? args.delay : undefined)}"
      >
        <button class="btn btn-secondary btn-large">Tooltip with delay</button>
      </post-tooltip-trigger>
      <post-tooltip id=${tooltipId}> This is the tooltip content </post-tooltip>
    `;
  },
};
