import React from 'react';
import { Meta, Story, Args } from '@storybook/react';
import docsPage from './topic-teaser.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Topic Teaser',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    title: 'Loremipsum',
    subtitle: 'Vero siteos et accusam iretea et justo',
    linkCount: 5,
    alignment: 'null',
    backgroundColor: 'bg-nightblue',
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'The text to include in the component title.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    subtitle: {
      name: 'Subtitle',
      description: 'The text to include in the component subtitle.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    linkCount: {
      name: 'Amount of links',
      description: 'The amount of the renderd links.',
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
      table: {
        category: 'General',
      },
    },
    alignment: {
      name: 'Image alignment',
      description: 'The alignment of the image.',
      control: {
        type: 'radio',
        labels: {
          'topic-teaser-reverse': 'Image left',
          'null': 'Image right',
        },
      },
      options: ['topic-teaser-reverse', 'null'],
      table: {
        category: 'General',
      },
    },
    backgroundColor: {
      name: 'Background Color',
      description: 'The color the component uses as background.',
      control: {
        type: 'select',
        labels: {
          'bg-light': 'Light',
          'bg-dark': 'Dark',
          'bg-nightblue': 'Nightblue',
          'bg-nightblue-bright': 'Nightblue (bright)',
          'bg-petrol': 'Petrol',
          'bg-petrol-bright': 'Petrol (bright)',
          'bg-coral': 'Coral',
          'bg-coral-bright': 'Coral (bright)',
          'bg-olive': 'Olive',
          'bg-olive-bright': 'Olive (bright)',
          'bg-purple': 'Purple',
          'bg-purple-bright': 'Purple (bright)',
          'bg-aubergine': 'Aubergine',
          'bg-aubergine-bright': 'Aubergine (bright)',
        },
      },
      options: [
        'bg-light',
        'bg-dark',
        'bg-nightblue',
        'bg-nightblue-bright',
        'bg-petrol',
        'bg-petrol-bright',
        'bg-coral',
        'bg-coral-bright',
        'bg-olive',
        'bg-olive-bright',
        'bg-purple',
        'bg-purple-bright',
        'bg-aubergine',
        'bg-aubergine-bright',
      ],
      table: {
        category: 'General',
      },
    },
  },
} as Meta;

const linkTexts = [
  'At vero eos et accusam et',
  'Dolores et ea rebum',
  'Stet clita kasd gubergren',
  'Sed diam nonumy eirmod',
  'Duo dolores et ea rebum',
  'Magna aliquyam erat',
  'Consetetur sadipscing elitr',
  'Justo duo dolores',
  'Takimata sanctus est',
  'Nonummy nibh euismod',
];

const Template = (args: Args) => {
  const classes = ['topic-teaser', args.backgroundColor, args.alignment, 'mb-huge-r']
    .filter(c => c && c !== 'null')
    .join(' ');

  const links: React.ReactElement[] = [];

  for (let x = 0; x < args.linkCount; x++) {
    links.push(
      <li key={x} className="link-list-item">
        <a href="#">
          <span>{linkTexts[x]}</span>
        </a>
      </li>,
    );
  }

  const content: React.ReactElement[] = [
    <div key="image" className="topic-teaser-image-container">
      <img
        className="topic-teaser-image"
        src="https://picsum.photos/id/553/800/800"
        width="100%"
        height="100%"
        alt="Test teaser image"
      />
    </div>,
    <div key="content" className="topic-teaser-content">
      <h2 className="topic-teaser-title font-curve-large mb-large">
        <span className="bold">{args.title}</span>
        <span className="light">{args.subtitle}</span>
      </h2>
      <ul className="link-list mb-large">{links}</ul>
    </div>,
  ];

  return (
    <div className={classes}>
      <div className="container">
        <div className={`topic-teaser-container ${args.backgroundColor}`}>
          <div className="row pt-huge-r">
            {args.alignment === 'null' ? [...content].reverse() : content}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default: Story = Template.bind({});
