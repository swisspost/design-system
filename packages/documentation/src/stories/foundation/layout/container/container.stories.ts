import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';
import './container.styles.scss';

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
        <div class="my-regular ${classNames}">
          <h2>${classNames}</h2>
          <div>
            <h3>Generic Content</h3>
          </div>
          ${withReset
            ? html`
                <div class="container-reset">
                  <h3>Reset Content</h3>
                </div>
              `
            : nothing}
        </div>
      `;
    }
    return html`
      <div class="container-example">
        ${genericContent('container', true)} ${genericContent('container-fluid', false)}
        ${genericContent('container-fluid-rg', false)}
      </div>
    `;
  },
};
