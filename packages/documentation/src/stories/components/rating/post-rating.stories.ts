import { Args, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@/../types';

const meta: MetaComponent = {
  id: '956e063b-b40c-4fe4-bc27-53b8c4ab1e81',
  title: 'Components/Rating',
  tags: ['package:WebComponents'],
  component: 'post-rating',
  render: render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=25398-6309&mode=design&t=38qLaYwWdirTcHdb-4',
    },
  },
  args: {
    'label': undefined,
    'stars': undefined,
    'currentRating': undefined,
    'readonly': false,
    'event-postInput': '',
    'event-postChange': '',
  },
  argTypes: {
    stars: {
      control: { type: 'number', min: 3, max: 10, step: 1 },
    },
    currentRating: {
      control: {
        type: 'number',
        min: 0,
        max: 10,
        step: 0.1,
      },
    },
  },
};

export default meta;

// RENDERER
function render(args: Args) {
  return html`
    <post-rating
      stars="${args.stars || nothing}"
      current-rating="${args.currentRating || nothing}"
      readonly="${args.readonly || nothing}"
    ></post-rating>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostRatingElement>;

export const Default: Story = {};

export const Readonly: Story = {
  parameters: {
    controls: {
      include: ['readonly'],
    },
  },
  args: {
    currentRating: 3,
    readonly: true,
  },
};
