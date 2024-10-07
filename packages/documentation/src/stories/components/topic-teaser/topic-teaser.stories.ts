import type { Args, StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '2ffc7a53-c1aa-4ff5-b1e4-fa638591399c',
  title: 'Components/Topic Teaser',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=9362-36051&mode=design&t=rXQXLIbDtUBHn9jE-4',
    },
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
};

export default meta;

type Story = StoryObj;

const linkTexts: string[] = [
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

export const Default: Story = {
  render: (args: Args) => {
    const classes = mapClasses({
      'topic-teaser': true,
      'mb-huge-r': true,
      [args.backgroundColor]: args.backgroundColor !== 'null',
      [args.alignment]: args.alignment !== 'null',
    });

    const links: TemplateResult[] = linkTexts.slice(0, args.linkCount).map(
      text => html`
        <li class="link-list-item">
          <a href="#">
            <span>${text}</span>
          </a>
        </li>
      `,
    );

    const image = html`
      <div class="topic-teaser-image-container">
        <img
          class="topic-teaser-image"
          src="https://picsum.photos/id/553/800/800"
          width="100%"
          height="100%"
          alt=""
        />
      </div>
    `;

    const content = html`
      <div class="topic-teaser-content">
        <h2 class="topic-teaser-title font-curve-large mb-24">
          <span class="bold">${args.title}</span>
          <span class="light">${args.subtitle}</span>
        </h2>
        <ul class="link-list mb-24">
          ${links}
        </ul>
      </div>
    `;

    return html`
      <div class="${classes}">
        <div class="container">
          <div class="topic-teaser-container ${args.backgroundColor}">
            <div class="row pt-huge-r">
              ${args.alignment === 'null' ? html` ${content}${image} ` : html` ${image}${content} `}
            </div>
          </div>
        </div>
      </div>
    `;
  },
};
