import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '7240f2ef-216a-490e-9bd8-c0cef19f7b31',
  title: 'Layout/Grid',
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
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
      </div>
    </div>
  `,
};

export const SingleColumnOnly: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="my-col-content-style">Don't do this!</div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col">
          <div class="my-col-content-style">Nor this!</div>
        </div>
      </div>
      <br />
      <p>Instead, your content should go here!</p>
    </div>
  `,
};

export const EqualWidth: Story = {
  render: () => html`
    <div class="container">
      <div class="row g-0">
        <div class="col">
          <div class="my-col-content-style">1 of 2</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">2 of 2</div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="my-col-content-style">1 of 3</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">2 of 3</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">3 of 3</div>
        </div>
      </div>
    </div>
  `,
};

export const SettingOneColumnWidth: Story = {
  render: () => html`
    <div class="container">
      <div class="row g-0">
        <div class="col">
          <div class="my-col-content-style">1 of 3</div>
        </div>
        <div class="col-6">
          <div class="my-col-content-style">2 of 3 (wider)</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">3 of 3</div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="my-col-content-style">1 of 3</div>
        </div>
        <div class="col-5">
          <div class="my-col-content-style">2 of 3 (wider)</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">3 of 3</div>
        </div>
      </div>
    </div>
  `,
};

export const VariableWidthContent: Story = {
  render: () => html`
    <div class="container">
      <div class="row g-0 justify-content-md-center">
        <div class="col col-lg-2">
          <div class="my-col-content-style">1 of 3</div>
        </div>
        <div class="col-md-auto">
          <div class="my-col-content-style">Variable width content</div>
        </div>
        <div class="col col-lg-2">
          <div class="my-col-content-style">3 of 3</div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="my-col-content-style">1 of 3</div>
        </div>
        <div class="col-md-auto">
          <div class="my-col-content-style">Variable width content</div>
        </div>
        <div class="col col-lg-2">
          <div class="my-col-content-style">3 of 3</div>
        </div>
      </div>
    </div>
  `,
};

export const AllBreakpoints: Story = {
  render: () => html`
    <div class="container">
      <div class="row g-0">
        <div class="col">
          <div class="my-col-content-style">col</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">col</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">col</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">col</div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col-8">
          <div class="my-col-content-style">col-8</div>
        </div>
        <div class="col-4">
          <div class="my-col-content-style">col-4</div>
        </div>
      </div>
    </div>
  `,
};

export const StackedToHorizontal: Story = {
  render: () => html`
    <div class="container">
      <div class="row g-0">
        <div class="col-md-8">
          <div class="my-col-content-style">col-md-8</div>
        </div>
        <div class="col-md-4">
          <div class="my-col-content-style">col-md-4</div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col-md">
          <div class="my-col-content-style">col-md</div>
        </div>
        <div class="col-md">
          <div class="my-col-content-style">col-md</div>
        </div>
        <div class="col-md">
          <div class="my-col-content-style">col-md</div>
        </div>
      </div>
    </div>
  `,
};

export const MixAndMatch: Story = {
  render: () => html`
    <div class="container">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <div class="row g-0">
        <div class="col-md-8">
          <div class="my-col-content-style">.col-md-8</div>
        </div>
        <div class="col-6 col-md-4">
          <div class="my-col-content-style">.col-6 .col-md-4</div>
        </div>
      </div>

      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <div class="row g-0">
        <div class="col-6 col-md-4">
          <div class="my-col-content-style">.col-6 .col-md-4</div>
        </div>
        <div class="col-6 col-md-4">
          <div class="my-col-content-style">.col-6 .col-md-4</div>
        </div>
        <div class="col-6 col-md-4">
          <div class="my-col-content-style">.col-6 .col-md-4</div>
        </div>
      </div>

      <!-- Columns width is always fix, on mobile and desktop -->
      <div class="row g-0">
        <div class="col-4">
          <div class="my-col-content-style">.col-4</div>
        </div>
        <div class="col-8">
          <div class="my-col-content-style">.col-8</div>
        </div>
      </div>
    </div>
  `,
};

export const RowColumns: Story = {
  render: () => html`
    <div class="container">
      <div class="row g-0 row-cols-2">
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
      </div>
      <br />
      <div class="row g-0 row-cols-3">
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
      </div>
      <br />
      <div class="row g-0 row-cols-auto">
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
      </div>
      <br />
      <div class="row g-0 row-cols-4">
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col-6">Column</div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
      </div>
      <br />
      <div class="row g-0 row-cols-1 row-cols-md-2 row-cols-lg-4">
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col">
          <div class="my-col-content-style">Column</div>
        </div>
      </div>
    </div>
  `,
};

export const Gutters: Story = {
  render: () => html`
    <div class="container">
      <div class="row gx-5 gy-1">
        <div class="col-6">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col-6">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col-6">
          <div class="my-col-content-style">Column</div>
        </div>
        <div class="col-6">
          <div class="my-col-content-style">Column</div>
        </div>
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
      <div class="row g-0">
        <div class="col-md-3">Level 1: .col-md-3</div>
        <div class="col-md-9">
          <div class="row g-0">
            <div class="col-8 col-md-6">Level 2: .col-8 .col-md-6</div>
            <div class="col-4 col-md-6">Level 2: .col-4 .col-md-6</div>
          </div>
        </div>
      </div>
    </div>
  `,
};
