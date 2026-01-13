import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '605c788d-3f75-4e6c-8498-be3d546843c2',
  title: 'Components/Card',
  tags: ['package:Styles', 'status:InProgress'],
  render: renderCard,
  decorators: [clickBlocker],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=18-13',
    },
  },
  args: {
    interactive: false,
    hiddenLink: false,
    action: 'link',
    title: 'Card title',
    body: "This is my card's content.",
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'The title of the card.',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    body: {
      name: 'Body',
      description: 'The content within the card.',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    interactive: {
      name: 'Interactive Card',
      description:
        'When set to true, the entire card becomes clickable. ' +
        'Only valid when the card contains exactly one navigation link.',
      control: { type: 'boolean' },
      table: { category: 'General' },
    },
    action: {
      name: 'Action',
      description: 'The type of actions used in the card.',
      if: {
        arg: 'interactive',
        truthy: false,
      },
      control: {
        type: 'inline-radio',
        labels: { link: 'Link', buttons: 'Buttons', none: 'None' },
      },
      options: ['link', 'buttons', 'none'],
      table: { category: 'General' },
    },
    hiddenLink: {
      name: 'Hidden Link',
      description: 'When set to true, the link within the interactive card is visually hidden.',
      if: {
        arg: 'interactive',
        truthy: true,
      },
      control: {
        type: 'boolean',
      },
      table: { category: 'General' },
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
function getCardLink(args: Args) {
  return html`
    <a class=${args.hiddenLink ? 'visually-hidden' : 'btn btn-tertiary px-0 mt-8'} href="#">
      Navigation Link
      <post-icon aria-hidden="true" name="arrowright"></post-icon>
    </a>
  `;
}

function getCardButtons() {
  return html`
    <div class="d-flex flex-column gap-8 mt-24">
      <button class="btn btn-primary">
        <span>Primary action</span>
      </button>
      <button class="btn btn-secondary">
        <span>Secondary action</span>
      </button>
      <button class="btn btn-tertiary">
        <span>Tertiary action</span>
      </button>
    </div>
  `;
}

function getCardContent(args: Args) {
  return html`
    <div class="card-body">
      ${args.title ? html`<h3 class="card-title">${args.title}</h3>` : nothing}
      ${args.body ? html`<p>${args.body}</p>` : nothing}
      ${args.interactive || args.action === 'link' ? getCardLink(args) : nothing}
      ${args.action === 'buttons' ? getCardButtons() : nothing}
    </div>
  `;
}

function renderCard(args: Args) {
  if (args.interactive) {
    return html`<post-linkarea class="card">${getCardContent(args)}</post-linkarea>`;
  } else {
    return html`<div class="card">${getCardContent(args)}</div>`;
  }
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [gridContainer],
};

export const Interactivity: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => html`
      <div class="d-flex gap-16">${story(context.args, context)}</div>
    `,
  ],
  render: (args: Args) => html`
    ${renderCard({
      ...args,
      interactive: true,
      title: 'Interactive card',
      body:
        'An interactive card is clickable as a whole. ' +
        'It contains a single interactive element which links to the same location as the card. ' +
        'The interactive element is acting as an additional indicator to the elevation that the card is clickable.',
    })}
    ${renderCard({
      ...args,
      interactive: false,
      action: 'link',
      title: 'Non-interactive card',
      body:
        'A non-interactive card is not clickable. ' +
        'It contains however either none one or more interactive elements where each of them triggers different actions.',
    })}
  `,
};

export const HiddenLink: Story = {
  decorators: [gridContainer],
  args: {
    interactive: true,
    hiddenLink: true,
    title: 'Interactive card with hidden link',
    body:
      'Although the card appears to have no link,' +
      'inspecting the code reveals a visually hidden link included to ensure accessibility support.',
  },
};
