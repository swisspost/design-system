import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'c55681df-4d21-469d-a5b3-c67686e7c104',
  title: 'Utilities/Text',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const FontFamily: Story = {
  render: () => html` <p class="font-sans-serif">This is sans serif text.</p> `,
};

export const FontSize: Story = {
  render: () => html` <p class="fs-tiny">This is tiny text.</p> `,
};

export const FontWeight: Story = {
  render: () => html` <p class="fw-bold">This is bold text.</p> `,
};

export const FontStyle: Story = {
  render: () => html` <p class="fst-italic">This is italic text.</p> `,
};

export const LineHeight: Story = {
  render: () => html` <p class="lh-1">This text has a line height equal to the font size.</p> `,
};

export const TextColor: Story = {
  decorators: [story => html` <div @click=${(e: Event) => e.preventDefault()}>${story()}</div> `],
  render: () => html`
    <p class="text-success">This is colored text.</p>
    <a href="#" class="link-warning">This is a colored link, it lightens on hover.</a>
  `,
};

export const TextColorReset: Story = {
  decorators: [story => html` <div @click=${(e: Event) => e.preventDefault()}>${story()}</div> `],
  render: () => html`
    <p class="text-danger">
      This is colored text with a
      <a href="#" class="text-reset">link</a>
      of the same color.
    </p>
  `,
};

export const TextAlign: Story = {
  render: () => html`
    <p class="text-start">Start aligned text</p>
    <p class="text-center">Center aligned text</p>
    <p class="text-end">End aligned text</p>
  `,
};

export const TextWrapping: Story = {
  render: () => html`
    <div class="my-container w-half">
      <p class="text-nowrap">
        This text should NOT wrap, saepe excepturi quas nihil repudiandae eius assumenda voluptatem.
      </p>
    </div>
    <div class="my-container w-half text-nowrap">
      <p class="text-wrap">
        This text should wrap, saepe excepturi quas nihil repudiandae eius assumenda voluptatem.
      </p>
    </div>
  `,
};

export const WordBreak: Story = {
  render: () => html`
    <div class="my-container w-half">
      <p class="text-break">wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
    </div>
  `,
};

export const TextTransform: Story = {
  render: () => html`
    <p class="text-lowercase">Lowercased text.</p>
    <p class="text-uppercase">Uppercased text.</p>
    <p class="text-capitalize">CapiTaliZed text.</p>
  `,
};

export const TextDecoration: Story = {
  render: () => html`
    <p class="text-decoration-underline">This text has a line underneath it.</p>
    <p class="text-decoration-line-through">This text has a line going through it.</p>
    <a href="#" class="text-decoration-none">This link has its text decoration removed</a>
  `,
};
