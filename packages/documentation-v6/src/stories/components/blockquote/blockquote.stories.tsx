import { Meta, Args, Story } from '@storybook/react';
import docsPage from './blockquote.docs.mdx';
import parse from 'html-react-parser';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Blockquote',
  parameters: {
    docs: {
      page: docsPage,
    },
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
} as Meta;

const Template = (args: Args) => {
  const blockquote = (
    <blockquote className="blockquote" lang={args.language}>
      <q>{parse(args.text)}</q>
    </blockquote>
  );

  if (args.caption) {
    return (
      <figure>
        {blockquote}
        <figcaption className="blockquote-footer">
          {args.captionAuthor} <cite title={args.sroucetitle}>{args.captionSource}</cite>
        </figcaption>
      </figure>
    );
  }

  return blockquote;
};

export const Default: Story = Template.bind({});

export const Nested: Story = Template.bind({});
Nested.args = {
  text: 'Consectetur <q>I am a nested quote!</q> adipiscing elit. Integer <q>I am a nested quote too!</q> posuere erat a ante.',
};
