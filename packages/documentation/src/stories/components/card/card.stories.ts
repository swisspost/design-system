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
    showImage: false,
    imagePosition: 'top',
    content: "<h5>This is my card's title</h5><p>This is my card's content.</p>",
    action: 'button',
  },
  argTypes: {
    showImage: {
      name: 'Show Image',
      description: 'When set to `true`, an image is shown in the card.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Image',
      },
    },
    imagePosition: {
      name: 'Image Position',
      description: 'Defines the position of the image within the card.',
      if: {
        arg: 'showImage',
      },
      control: {
        type: 'inline-radio',
        labels: {
          top: 'Top',
          bottom: 'Bottom',
        },
      },
      options: ['top', 'bottom'],
      table: {
        category: 'Card Image',
      },
    },
    content: {
      name: 'Content',
      description: 'The content within the card.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Card Content',
      },
    },
    action: {
      name: 'Action',
      description: 'Defines the call-to-action to show in the card.',
      control: {
        type: 'inline-radio',
        labels: {
          button: 'Button',
          links: 'Links',
          none: 'None',
        },
      },
      options: ['button', 'links', 'none'],
      table: {
        category: 'Card Content',
      },
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
    <div class="row gy-16">
      <div class="col-lg-4 col-sm-6 col-12">${story(context.args, context)}</div>
    </div>
  `;
}

// RENDERER
function getCardLinks() {
  return html`
    ${['Link Text', 'More Link'].map(label => html` <a class="card-link" href="#">${label}</a> `)}
  `;
}

function getCardButton() {
  return html`
    <button class="btn btn-primary">
      <span>Button Text</span>
    </button>
  `;
}

function getCardContent({ content, action }: Args) {
  return html`
    <div class="card-body">
      ${unsafeHTML(content)}
      ${choose(
        action,
        [
          ['button', getCardButton],
          ['links', getCardLinks],
        ],
        () => html` ${nothing} `,
      )}
    </div>
  `;
}

function getCardImage() {
  return html` <img src="https://picsum.photos/id/38/500/300" alt="" /> `;
}

function renderCard(args: Args) {
  const { showImage, imagePosition } = args;

  return html`
    <div class="card">
      ${showImage && imagePosition === 'top' ? getCardImage() : nothing} ${getCardContent(args)}
      ${showImage && imagePosition === 'bottom' ? getCardImage() : nothing}
    </div>
  `;
}

function renderCardWithInteractiveContainer(args: Args) {
  return html`<post-linkarea>${renderCard(args)}</post-linkarea>`;
}

const renderSimpleInteractiveCard = html`
  <post-linkarea>
    <div class="card">
      <div class="card-body">
        <p><a href="http://google.com">Interactive card</a></p>
      </div>
    </div>
  </post-linkarea>
`;

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [gridContainer],
  render: (args: Args) =>
    html`${args.action === 'button' ? renderCardWithInteractiveContainer(args) : renderCard(args)}`,
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

export const Palette: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () =>
    html`
      <div class="palette palette-default">
        <div class="container py-32">
          <div class="row gy-16">
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
          </div>
        </div>
      </div>
      <div class="palette palette-alternate">
        <div class="container py-32">
          <div class="row gy-16">
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
          </div>
        </div>
      </div>
    `,
};

export const ListGroup: Story = {
  decorators: [gridContainer],
  render: () => {
    return html`
      <div class="card">
        <ul class="list-interactive">
          ${['First Item', 'Second Item', 'Another Item'].map(
            label => html` <li class="list-interactive-item">${label}</li> `,
          )}
        </ul>
      </div>
    `;
  },
};

export const CustomContent: Story = {
  decorators: [gridContainer],
  render: () => {
    return html`
      <div class="card">
        <div class="d-flex px-16 py-32 gap-16 align-items-center">
          <post-icon aria-hidden="true" scale="2" name="profile"></post-icon>
          <h3 class="fw-bold my-0 me-auto">User Details</h3>
          <a href="#" aria-labelledby="details-title">
            <post-icon aria-hidden="true" name="arrowright"></post-icon>
            <span class="visually-hidden">Account Management</span>
          </a>
        </div>
        <ul class="list-interactive">
          <li class="list-interactive-item d-flex align-items-center justify-content-between">
            <address class="mb-0">
              Mr<br />First Name Last Name<br />Street 1<br />1234 City
            </address>
            <a href="#">
              <post-icon aria-label="Edit Address" name="edit"></post-icon>
              <span class="visually-hidden">Edit Address</span>
            </a>
          </li>
          <li class="list-interactive-item d-flex align-items-center justify-content-between">
            <p class="mb-0">Language: <span class="fw-bold">English</span></p>
            <a href="#">
              <post-icon aria-label="Edit Language" name="edit"></post-icon>
              <span class="visually-hidden">Edit Language</span>
            </a>
          </li>
        </ul>
        <div class="card-links p-16">
          <a href="#">Add Address</a>
        </div>
      </div>
    `;
  },
};
