import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '605c788d-3f75-4e6c-8498-be3d546843c2',
  title: 'Components/Card',
  tags: ['package:Styles', 'status:InProgress'],
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
    action: 'buttons',
    interactive: false,
    label: 'Button Text',
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
        labels: { button: 'Button', link: 'Link', none: 'None' },
      },
      options: ['button', 'buttons', 'link', 'links', 'none'],
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
function getCardLink() {
  return html`
    <div class="">
      <a class="btn btn-tertiary" href="#">
        Button
        <post-icon aria-hidden="true" name="3020"></post-icon>
      </a>
    </div>
  `;
}
function getCardButton({ label }: Args) {
  return html`
    <div class="d-flex flex-column gap-2 mt-6">
      <button class="btn btn-primary">
        <span>${label}</span>
      </button>
    </div>
  `;
}

function getCardButtons({ label }: Args) {
  return html`
    <div class="d-flex flex-column gap-2 mt-6">
      <button class="btn btn-primary">
        <span>${label}</span>
      </button>
      <button class="btn btn-secondary">
        <span>${label}</span>
      </button>
      <button class="btn btn-tertiary">
        <span>${label}</span>
      </button>
    </div>
  `;
}

function getCardLinks() {
  return html`
    <div class="card-links d-flex gap-3">
      <a class="btn btn-tertiary px-0" href="#">
        Link 1
        <post-icon aria-hidden="true" name="3020"></post-icon>
      </a>
      <a class="btn btn-tertiary px-0" href="#">
        Link 2
        <post-icon aria-hidden="true" name="3020"></post-icon>
      </a>
    </div>
  `;
}

function getCardContent(args: Args) {
  const { action, title, body = '' } = args;
  return html`
    <div class="card-body">
      ${title ? html`<h3 class="card-title">${title}</h3>` : nothing} ${unsafeHTML(body)}
      ${choose(
        action,
        [
          ['button', () => getCardButton(args)],
          ['link', getCardLink],
          ['buttons', () => getCardButtons(args)],
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

function renderCard(args: Args) {
  const { action } = args;
  const isInteractive = action === 'button' || action === 'link';

  if (isInteractive) {
    return html`<post-linkarea class="card">${renderCardContent(args)}</post-linkarea>`;
  } else {
    return html`<div class="card">${renderCardContent(args)}</div>`;
  }
}

const renderSimpleInteractiveCard = html`
  <post-linkarea class="card">
    <div class="card-body">
      <p class="card-links">
        <a href="http://google.com" class="btn-link px-0">Interactive card</a>
      </p>
    </div>
  </post-linkarea>
`;

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [gridContainer],
  render: (args: Args) => renderCard(args),
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
