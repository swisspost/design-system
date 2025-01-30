import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'f1cda0ac-28d4-4afc-b56d-9182bd9bd671',
  title: 'Components/App Store Badge',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2513-10518&node-type=instance&t=YDywHpWmdpWu1a5h-0',
    },
  },
  args: {
    store: 'google-play',
  },
  argTypes: {
    store: {
      name: 'Store',
      description: 'Select between Google Play and Apple Store badge',
      control: {
        type: 'radio',
        labels: {
          'google-play': 'Google Play',
          'apple-store': 'Apple Store',
        },
      },
      options: ['google-play', 'apple-store'],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type StoreType = 'google-play' | 'apple-store';

export const RenderBadge = (store: StoreType) => {
  const badgeInfo = {
    'google-play': {
      src: '/assets/images/google-play-badge.svg',
      alt: 'Google Play Store badge',
      spanText: 'Download the App on Google Play',
    },
    'apple-store': {
      src: '/assets/images/apple-store-badge.svg',
      alt: 'Apple App Store badge',
      spanText: 'Download the App on the Apple Store',
    },
  };

  const { src, alt, spanText } = badgeInfo[store];

  return html`
    <a class="app-store-badge" href="#">
      <img src="${src}" alt="${alt}" />
      <span class="visually-hidden">${spanText}</span>
    </a>
  `;
};

type Story = StoryObj<{ store: StoreType }>;

export const Default: Story = {
  render: args => RenderBadge(args.store),
};
