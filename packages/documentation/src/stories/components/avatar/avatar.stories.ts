import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostAvatarElement> = {
  id: 'ecf5e441-ebe3-4516-a2c9-e5ff20b8c361',
  title: 'Components/Avatar',
  component: 'post-avatar',
  render: getAvatar,
  tags: ['package:WebComponents'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?node-id=17162-9642&t=TI8Z92QcZA8yAw58-0',
    },
  },
  args: {
    company: 'Muster AG',
    email: '',
    firstname: 'Mika',
    lastname: 'Muster',
    size: 'large',
  },
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
      },
    },
  },
};

export default meta;

// RENDERER
function getAvatar(args: Args) {
  return html`<post-avatar
    company=${ifDefined(args.company || undefined)}
    email=${ifDefined(args.email || undefined)}
    firstname=${ifDefined(args.firstname || undefined)}
    lastname=${ifDefined(args.lastname || undefined)}
    size=${args.size}
  ></post-avatar>`;
}

type Story = StoryObj<HTMLPostAvatarElement>;

export const Default: Story = {};

export const Size: Story = {
  args: {
    size: 'small',
  },
};

export const Picture: Story = {
  args: {
    email: 'oss@post.ch',
  },
};
