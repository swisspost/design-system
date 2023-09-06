import type { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';

const meta: Meta = {
  title: 'Foundations/Layout/Container',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args, context: StoryContext) => {
    return html`
      <div class="container" style="background-color:grey">
        <h2>Container</h2>
        <div style="background-color:orange">
          <h3>Generic Content</h3>
        </div>
        <div class="container-reset" style="background-color:orange">
          <h3>Reset Content</h3>
        </div>
      </div>
      <div class="container-fluid" style="background-color:grey">
        <h2>Container-Fluid</h2>
        <div style="background-color:orange">
          <h3>Generic Content</h3>
        </div>
      </div>
      <div class="container-fluid-rg" style="background-color:grey">
        <h2>Container-Fluid-rg</h2>
        <div style="background-color:orange">
          <h3>Generic Content</h3>
        </div>
      </div>
    `;
  },
};
