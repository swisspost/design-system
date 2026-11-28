import { fakeContent } from '@preview/utils/fake-content';
import { MetaComponent } from '@preview/types/storybook';
import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

const defaultArgs: Args = {
  project: 'test',
  environment: 'int01',
  language: 'en',
  activeRoute: 'auto',
  fullWidth: false,
  hideLogin: false,
  textMain: 'Main',
  textMenu: 'Menu',
  textChangeLanguage: 'Change the language',
  textCurrentLanguage: 'The currently selected language is {name}.',
  textCurrentUser: 'Current user is {user}.',
  textUserLinks: 'User links',
  textClose: 'Close',
  textBack: 'Back',
};

const meta: MetaComponent = {
  id: 'ebb11274-091b-4cb7-9a3f-3e0451c9a865',
  title: 'Components/Header/Pre-Configured',
  tags: ['package:internet-header', 'status:new'],
  component: 'swisspost-internet-header',
  parameters: {
    badges: [],
    layout: 'fullscreen',
    controls: { sort: 'alpha' },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=19536-26512&mode=design&t=HksCTWa2MMccgMl4-0',
    },
  },
  args: defaultArgs,
  render: renderHeader,
  decorators: [story => html`${story()} ${fakeContent()}`],
};

export function renderHeader({ innerHMTL, ...args }: Args = defaultArgs) {
  return html`
    <swisspost-internet-header
      active-route=${args.activeRoute !== 'auto' ? args.activeRoute : nothing}
      project=${args.project}
      environment=${args.environment !== 'prod' ? args.environment : nothing}
      language=${args.language}
      ?full-width=${args.fullWidth}
      ?hide-login=${args.hideLogin}
      text-main=${args.textMain}
      text-menu=${args.textMenu}
      text-change-language=${args.textChangeLanguage}
      text-current-language=${args.textCurrentLanguage}
      text-current-user=${args.textCurrentUser}
      text-user-links=${args.textUserLinks}
      text-close=${args.textClose}
      text-back=${args.textBack}
    ></swisspost-internet-header>
  `;
}

export default meta;

type Story = StoryObj;

// Rendered in an iframe so the header switches to mobile based on the preview width, not the page width
export const Default: Story = {
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
};
