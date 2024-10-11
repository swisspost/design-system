import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '@root/types';
import { html, nothing } from 'lit';
import { components } from '@swisspost/design-system-components/dist/docs.json';
import { coloredBackground } from '@/shared/decorators/dark-background';

const AVATAR_ARGTYPES = components.find(c => c.tag === 'post-avatar');
const USERID_ARGTYPE = AVATAR_ARGTYPES?.props.find(p => p.name === 'userid');
const EMAIL_ARGTYPE = AVATAR_ARGTYPES?.props.find(p => p.name === 'email');

const meta: MetaComponent = {
  id: '09aac03d-220e-4885-8fb8-1cfa01add188',
  title: 'Components/Avatar',
  component: 'post-avatar',
  tags: ['package:WebComponents'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?node-id=17162-9642&t=TI8Z92QcZA8yAw58-0',
    },
  },
  args: {
    tag: null,
    firstname: 'Firstname',
    lastname: '',
    userid: '',
    email: '',
    imageSrc: '',
  },
  argTypes: {
    'userid': {
      description: `${
        USERID_ARGTYPE?.docs ?? ''
      }<div className="alert alert-info alert-sm">Do you need an example userid? Try it out with the username of your own post account.</div>`,
    },
    'email': {
      description: `${
        EMAIL_ARGTYPE?.docs ?? ''
      } <div className="alert alert-info alert-sm">Do you need an example email address? Try it out with <strong>oss@post.ch</strong>.</div>`,
    },
    'imageSrc': {
      control: 'text',
      description:
        'Define an image `src` to insert a custom image.<div className="alert alert-info alert-sm">Do you need an example? Try our logo <strong>/assets/images/logo-swisspost.svg</strong>.</div>',
      table: {
        category: 'Content',
      },
    },
    'slots-default': {
      name: 'default',
      table: {
        type: {
          summary: 'HTMLImageElement',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => coloredBackground(story, context, 'light'),
  ],
  render: (args: Args) => html`<post-avatar
    tag="${args.tag || nothing}"
    href="${(args.tag === 'a' && '#') || nothing}"
    firstname="${args.firstname || nothing}"
    lastname="${args.lastname || nothing}"
    userid="${args.userid || nothing}"
    email="${args.email || nothing}"
    >${args.imageSrc
      ? html`<img
          src="${args.imageSrc}"
          alt="${[args.firstname, args.lastname].filter(n => n).join(' ')}"
        />`
      : nothing}</post-avatar
  >`,
};
