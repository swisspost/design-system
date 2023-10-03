import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
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
  render: () => {
    function genericContent(classNames: string, withReset: boolean) {
      return html`
        <div class="border border-primary bg-primary ${classNames}">
          <h2>${classNames}</h2>
          <div class="bg-light">
            <h3>Generic Content</h3>
          </div>
          ${withReset
            ? html`
                <div class="bg-light container-reset">
                  <h3>Reset Content</h3>
                </div>
              `
            : nothing}
        </div>
      `;
    }
    return html`
      ${genericContent('container', true)} ${genericContent('container-fluid', false)}
      ${genericContent('container-fluid-rg', false)}
    `;
  },
};
