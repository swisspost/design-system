import { Args, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '@root/types';
import { html, nothing } from 'lit';
import { components } from '@swisspost/design-system-components/dist/docs.json';

const AVATAR_PICTURE_ARGTYPES = components.find(c => c.tag === 'post-avatar-picture');
const ARGS_EMAIL_ARGTYPE = AVATAR_PICTURE_ARGTYPES?.props.find(p => p.name === 'email');

const meta: MetaComponent = {
  id: '09aac03d-220e-4885-8fb8-1cfa01add188',
  title: 'Components/Avatar-Picture',
  component: 'post-avatar-picture',
  tags: ['package:WebComponents'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?node-id=17162-9642&t=TI8Z92QcZA8yAw58-0',
    },
  },
  args: {
    size: 'default',
    email: '',
    firstname: 'Firstname',
    lastname: '',
  },
  argTypes: {
    size: {
      control: {
        type: 'radio',
        labels: {
          default: 'Default',
          large: 'Large',
          small: 'Small',
        },
      },
      options: ['default', 'large', 'small'],
    },
    email: {
      description: `${
        ARGS_EMAIL_ARGTYPE?.docs ?? ''
      } <br>Do you need an example email address? Try it out with <strong>oss@post.ch</strong>.`,
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    return html`<post-avatar-picture
      size="${args.size !== 'default' ? args.size : nothing}"
      email="${args.email || nothing}"
      firstname="${args.firstname || nothing}"
      lastname="${args.lastname || nothing}"
    ></post-avatar-picture>`;
  },
};
