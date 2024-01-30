import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';
import { spreadArgs } from '../../../utils';

const meta: Meta<HTMLPostRatingElement> = {
  title: 'Components/Rating',
  component: 'post-rating',
  render: render,
  parameters: {
    badges: [BADGE.NEEDS_REVISION, BADGE.SINCE_V1],
  },
  argTypes: {
    currentRating: {
      name: 'currentRating',
      control: { type: 'number' },
      description: 'The current rating value',
      defaultValue: 0,
    },
    max: {
      name: 'max',
      control: { type: 'number' },
      description: 'The number of stars in the rating',
      defaultValue: 10,
    },
    disabled: {
      name: 'disabled',
      control: { type: 'boolean' },
      description: 'Boolean for the disabled state of the component',
      defaultValue: false,
    },
    readonly: {
      name: 'readonly',
      control: { type: 'boolean' },
      description:
        'If readonly is true, the component only displays a rating and is not interactive.',
      defaultValue: false,
    },
  },
};

export default meta;

// RENDERER
function render(args: Partial<HTMLPostRatingElement>) {
  return html`
    <post-rating ${spreadArgs(args)}></post-rating>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostRatingElement>;

export const Default: Story = {};

export const Disabled: Story = {
  parameters: {
    controls: {
      include: ['disabled'],
    },
  },
  args: {
    currentRating: 5,
    disabled: true,
  },
};

export const Readonly: Story = {
  parameters: {
    controls: {
      include: ['readonly'],
    },
  },
  args: {
    currentRating: 5,
    readonly: true,
  },
};

export const CurrentRating: Story = {
  parameters: {
    controls: {
      include: ['currentRating'],
    },
  },
  args: {
    currentRating: 3,
  },
};
