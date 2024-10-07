import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '7240f2ef-216a-490e-9bd8-c0cef19f7b31',
  title: 'Foundations/Layout/Grid',
  parameters: {
    badges: [],
  },
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="grid-example text-center ${args?.additionalDecoratorsClasses}">
        ${story(args, context)}
      </div>
    `,
  ],
};

export default meta;

type Story = StoryObj;

export const Basis: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
      </div>
    </div>
  `,
};

export const SingleColumnOnly: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col">Don't do this!</div>
      </div>
      <p class="py-12">Instead, your content should go here!</p>
    </div>
  `,
};

export const EqualWidth: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col">1 of 2</div>
        <div class="col">2 of 2</div>
      </div>
      <div class="row">
        <div class="col">1 of 3</div>
        <div class="col">2 of 3</div>
        <div class="col">3 of 3</div>
      </div>
    </div>
  `,
};

export const SettingOneColumnWidth: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col">1 of 3</div>
        <div class="col-6">2 of 3 (wider)</div>
        <div class="col">3 of 3</div>
      </div>
      <div class="row">
        <div class="col">1 of 3</div>
        <div class="col-5">2 of 3 (wider)</div>
        <div class="col">3 of 3</div>
      </div>
    </div>
  `,
};

export const VariableWidthContent: Story = {
  render: () => html`
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-2">1 of 3</div>
        <div class="col-md-auto">Variable width content</div>
        <div class="col col-lg-2">3 of 3</div>
      </div>
      <div class="row">
        <div class="col">1 of 3</div>
        <div class="col-md-auto">Variable width content</div>
        <div class="col col-lg-2">3 of 3</div>
      </div>
    </div>
  `,
};

export const AllBreakpoints: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col">col</div>
        <div class="col">col</div>
        <div class="col">col</div>
        <div class="col">col</div>
      </div>
      <div class="row">
        <div class="col-8">col-8</div>
        <div class="col-4">col-4</div>
      </div>
    </div>
  `,
};

export const StackedToHorizontal: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col-md-8">col-md-8</div>
        <div class="col-md-4">col-md-4</div>
      </div>
      <div class="row">
        <div class="col-md">col-md</div>
        <div class="col-md">col-md</div>
        <div class="col-md">col-md</div>
      </div>
    </div>
  `,
};

export const MixAndMatch: Story = {
  render: () => html`
    <div class="container">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <div class="row">
        <div class="col-md-8">.col-md-8</div>
        <div class="col-6 col-md-4">.col-6 .col-md-4</div>
      </div>

      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <div class="row">
        <div class="col-6 col-md-4">.col-6 .col-md-4</div>
        <div class="col-6 col-md-4">.col-6 .col-md-4</div>
        <div class="col-6 col-md-4">.col-6 .col-md-4</div>
      </div>

      <!-- Columns width is always fix, on mobile and desktop -->
      <div class="row">
        <div class="col-4">.col-4</div>
        <div class="col-8">.col-8</div>
      </div>
    </div>
  `,
};

export const RowColumns: Story = {
  render: () => html`
    <div class="container">
      <div class="row row-cols-2">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
      </div>
      <br />
      <div class="row row-cols-3">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
      </div>
      <br />
      <div class="row row-cols-auto">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
      </div>
      <br />
      <div class="row row-cols-4">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col-6">Column</div>
        <div class="col">Column</div>
      </div>
      <br />
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
      </div>
    </div>
  `,
};

export const Gutters: Story = {
  render: () => html`
    <div class="container">
      <div class="row gx-48 gy-8">
        <div class="col-6">Column</div>
        <div class="col-6">Column</div>
        <div class="col-6">Column</div>
        <div class="col-6">Column</div>
      </div>
    </div>
  `,
};

export const Nested: Story = {
  args: {
    additionalDecoratorsClasses: 'grid-nested-example',
  },
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col-md-3">Level 1: .col-md-3</div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-8 col-md-6">Level 2: .col-8 .col-md-6</div>
            <div class="col-4 col-md-6">Level 2: .col-4 .col-md-6</div>
          </div>
        </div>
      </div>
    </div>
  `,
};
