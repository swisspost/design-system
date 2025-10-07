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
    content: "<h5>This is my card's title</h5><p>This is my card's content.</p>",
    action: 'button',
  },
  argTypes: {
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
    ${['Link Text', 'More Link'].map(
      label =>
        html`
          <a class="card-links" href="#"
            >${label}<post-icon name="arrowright" aria-hidden="true"></post-icon
          ></a>
        `,
    )}
  `;
}

function getCardButton() {
  return html`
    <button class="btn btn-primary ">
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
