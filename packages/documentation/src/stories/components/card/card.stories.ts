import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '605c788d-3f75-4e6c-8498-be3d546843c2',
  title: 'Components/Card',
  tags: ['package:Styles'],
  decorators: [clickBlocker],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=18-13',
    },
  },
  args: {
    title: "This is my card's title",
    body: "This is my card's content.",
    interactive: false,
    action: 'buttons',
    interactiveAction: 'button',
    label: 'Button Text',
    variant: 'btn-primary',
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      table: { category: 'Card Content' },
    },
    body: {
      name: 'Body',
      description: 'The content within the card.',
      control: { type: 'text' },
      table: { category: 'Card Content' },
    },
    label: {
      name: 'label',
      description: 'The content button',
      control: { type: 'text' },
      table: { category: 'Card Content' },
    },
    interactive: {
      name: 'Interactive',
      description: 'Wrap in <post-linkarea> and use Interactive Action.',
      control: { type: 'boolean' },
      table: { category: 'General' },
    },
    action: {
      name: 'Action',
      description: 'Non-interactive card action.',
      control: {
        type: 'inline-radio',
        labels: { buttons: 'Buttons', link: 'Link', none: 'None' },
      },
      options: ['buttons', 'link', 'none'],
      if: { arg: 'interactive', eq: false },
      table: { category: 'Card Content' },
    },
    interactiveAction: {
      name: 'Interactive Action',
      description: 'Interactive card action.',
      control: {
        type: 'inline-radio',
        labels: { button: 'Button', link: 'Link' },
      },
      options: ['button', 'link'],
      if: { arg: 'interactive', eq: true },
      table: { category: 'Card Content' },
    },
    variant: {
      name: 'Variant',
      description: 'Defines a style variant.',
      control: {
        type: 'inline-radio',
        labels: {
          'btn-primary': 'Primary',
          'btn-secondary': 'Secondary',
          'btn-tertiary': 'Tertiary',
        },
      },
      options: ['btn-primary', 'btn-secondary', 'btn-tertiary'],
      table: { category: 'Card Content' },
      if: { arg: 'action', neq: 'link' },
    },
  },
};

export default meta;

// DECORATORS
function clickBlocker(story: StoryFn, context: StoryContext) {
  return html`
    <div @click=${(e: Event) => e.preventDefault()}>${story(context.args, context)}</div>
  `;
}

function gridContainer(story: StoryFn, context: StoryContext) {
  return html`
    <div class="container">
      <div class="row gy-16 ">
        <div class="col-lg-4 col-sm-6 col-12">${story(context.args, context)}</div>
      </div>
    </div>
  `;
}

// RENDERER
function getCardLinks() {
  return html`
    <div class="card-links">
      <a href="#" class="btn-link px-0">Link Text</a>
    </div>
  `;
}

function getCardButton({ label, variant }: Args) {
  return html`
    <button class="btn ${variant}">
      <span>${label}</span>
    </button>
  `;
}

function getCardContent(args: Args) {
  const { content, action } = args;
  return html`
    <div class="card-body">
      ${unsafeHTML(content)}
      ${choose(
        action,
        [
          ['button', () => getCardButton(args)],
          ['links', getCardLinks],
        ],
        () => html` ${nothing} `,
      )}
    </div>
  `;
}

function renderCardContent(args: Args) {
  return html` ${getCardContent(args)} `;
}

function renderNoninteractiveCard(args: Args) {
  return html` <div class="card">${renderCardContent(args)}</div> `;
}

function renderInteractiveCard(args: Args) {
  return html`<post-linkarea class="card">${renderCardContent(args)}</post-linkarea>`;
}

const renderSimpleInteractiveCard = html`
  <post-linkarea class="card">
    <div class="card-body">
      <p>
        <a href="http://google.com"
          >Interactive card <post-icon name="arrowright" aria-hidden="true"></post-icon
        ></a>
      </p>
    </div>
  </post-linkarea>
`;

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [gridContainer],
  render: (args: Args) =>
    html`${args.action === 'button'
      ? renderInteractiveCard(args)
      : renderNoninteractiveCard(args)}`,
};

export const Foundation: Story = {
  decorators: [(story: StoryFn) => html`<div class="d-flex gap-16">${story()}</div>`],
  render: () => html`
    <div class="card">
      <div class="card-body">
        <p>Non-interactive card</p>
      </div>
    </div>
    ${renderSimpleInteractiveCard}
  `,
};
