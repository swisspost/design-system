import { Meta, StoryFn, StoryObj, StoryContext } from '@storybook/web-components';
import { BADGE } from '../../../../../.storybook/constants';
import { html } from 'lit';
import './grid.styles.scss';

const meta: Meta = {
  title: 'Foundations/Layout/Grid-Update-Test',
  parameters: {
    layout: 'fullscreen',
    badges: [BADGE.NEEDS_REVISION],
  },
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="grid-example text-center">${story(args, context)}</div>
    `,
  ],
};

export default meta;

type Story = StoryObj;

export const Basis: Story = {
  render: () => html`
    <div class="py-5">
      <div>
        Active Breakpoint:
        <span class="d-inline d-sm-none">xs</span>
        <span class="d-none d-sm-inline d-rg-none">sm</span>
        <span class="d-none d-rg-inline d-md-none">rg</span>
        <span class="d-none d-md-inline d-lg-none">md</span>
        <span class="d-none d-lg-inline d-xl-none">lg</span>
        <span class="d-none d-xl-inline d-xxl-none">xl</span>
        <span class="d-none d-xxl-inline">xxl</span>
      </div>

      <div>
        <div class="bg-margin">
          <div class="container bg-padding">
            <div class="bg-container py-2">
              <div class="row bg-border">
                <div class="col-2"><div class="bg-container">1</div></div>
                <div class="col-2"><div class="bg-container">2</div></div>
                <div class="col-2"><div class="bg-container">3</div></div>
                <div class="col-2"><div class="bg-container">4</div></div>
                <div class="col-2"><div class="bg-container">5</div></div>
                <div class="col-2"><div class="bg-container">6</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div>
        <div class="bg-margin">
          <div class="container-fluid bg-padding">
            <div class="bg-container py-2">
              <div class="row bg-border">
                <div class="col-2"><div class="bg-container">1</div></div>
                <div class="col-2"><div class="bg-container">2</div></div>
                <div class="col-2"><div class="bg-container">3</div></div>
                <div class="col-2"><div class="bg-container">4</div></div>
                <div class="col-2"><div class="bg-container">5</div></div>
                <div class="col-2"><div class="bg-container">6</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
