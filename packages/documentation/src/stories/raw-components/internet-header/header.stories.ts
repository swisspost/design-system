import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { fakeContent } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'ebb11274-091b-4cb7-9a3f-3e0451c9a865',
  title: 'Raw Components/Internet Header',
  tags: ['package:InternetHeader', 'status:Deprecated', 'devOnly'],
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
  render,
  args: {
    project: 'test',
    environment: 'int01',
    language: 'en',
    activeRoute: 'auto',
    fullWidth: false,
    textMain: 'Main',
    textMenu: 'Menu',
    textChangeLanguage: 'Change the language',
    textCurrentLanguage: 'The currently selected language is #name.',
    textCurrentUser: 'Current user is John Doe.',
    textUserLinks: 'User links',
    textClose: 'Close',
    textBack: 'Back',
  },
  decorators: [
    story => html`
      <div
        class="header-story-wrapper"
        style="--header-z-index: 1;overflow: auto;max-height: 100svh;"
      >
        ${story()} ${fakeContent()}
      </div>
    `,
  ],
};

function render({ innerHMTL, ...args }: Args) {
  return html`
    <swisspost-internet-header
      active-route=${args.activeRoute !== 'auto' ? args.activeRoute : nothing}
      project=${args.project}
      environment=${args.environment !== 'prod' ? args.environment : nothing}
      language=${args.language}
      ?full-width=${args.fullWidth}
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

export const Default: Story = {};
