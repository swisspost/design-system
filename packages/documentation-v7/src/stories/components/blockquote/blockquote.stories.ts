import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, unsafeStatic } from 'lit/static-html.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Blockquote',
  render: renderBlockquote,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
    language: 'en',
    caption: false,
    captionAuthor: 'Author',
    captionSource: 'Source',
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'The text to insert into the blockquote.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    language: {
      name: 'Language',
      description: 'The documents language.',
      control: {
        type: 'radio',
        labels: {
          en: 'English',
          de: 'Deutsch',
          fr: 'Français',
          it: 'Italiano',
        },
      },
      options: ['en', 'de', 'fr', 'it'],
      table: {
        category: 'General',
      },
    },
    caption: {
      name: 'Caption',
      description: 'When set to `true`, a caption is inserted after the blockquote text.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Variations',
      },
    },
    captionAuthor: {
      name: 'Author',
      description: 'The author of the quote.',
      if: {
        arg: 'caption',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'Variations',
      },
    },
    captionSource: {
      name: 'Source',
      description: 'The source of the quote.',
      if: {
        arg: 'caption',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'Variations',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderBlockquote(args: Args) {
  const blockquote = html`
    <blockquote class="blockquote" lang=${args.language}>
      <q>${unsafeStatic(args.text)}</q>
    </blockquote>
  `;

  return args.caption
    ? html`
        <figure>
          ${blockquote}
          <figcaption class="blockquote-footer">
            ${args.captionAuthor}
            <cite>${args.captionSource}</cite>
          </figcaption>
        </figure>
      `
    : blockquote;
}

export const Default: Story = {};

export const Nested: Story = {
  args: {
    text: 'Consectetur <q>I am a nested quote!</q> adipiscing elit. Integer <q>I am a nested quote too!</q> posuere erat a ante.',
  },
};
