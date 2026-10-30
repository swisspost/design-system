import { fakeContent } from '@/utils';
import { MetaComponent } from '@root/types';
import testConfiguration from '@swisspost/internet-header/dist/swisspost-internet-header/assets/config/test-configuration.json';
import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import {
  installKlpPlatformFake,
  KLP_FAKE_SESSION_LABELS,
  uninstallKlpPlatformFake,
} from '../sub-components/klp-login-widget/klp-platform.fake';

const defaultArgs: Args = {
  project: 'test',
  environment: 'int01',
  language: 'en',
  activeRoute: 'auto',
  fullWidth: false,
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
  tags: ['package:InternetHeader', 'status:New'],
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
  args: { ...defaultArgs, session: 'anonymous' },
  argTypes: {
    session: {
      name: 'Session',
      description:
        'Not a property of the component. Replaces the KLP platform with a fake answering as the selected user, so the user menu can be seen with the links from the configuration.',
      control: { type: 'select', labels: KLP_FAKE_SESSION_LABELS },
      options: Object.keys(KLP_FAKE_SESSION_LABELS),
      table: { category: 'Storybook' },
    },
  },
  // Removes the fake once a story is torn down, so it never leaks into the next one.
  beforeEach: () => uninstallKlpPlatformFake,
  // Keyed on the session and the language, so a changed control mounts a new header: its widget asks the
  // fake again and its language menu picks up the newly active language.
  render: args => {
    const key = `${args.session}-${args.language}`;
    installKlpPlatformFake({ user: args.session === 'anonymous' ? null : args.session });
    return html`${keyed(key, renderHeader(args))}`;
  },
  decorators: [
    // The header prefers a `#PPM_HEADER_DATA` config over the API, so the page renders without any request.
    (story, { args }) => html`
      <script
        id="PPM_HEADER_DATA"
        type="application/json"
        .textContent=${JSON.stringify(getLocalizedTestConfiguration(args.language))}
      ></script>
      <div class="header-story-wrapper">
        <div class="virtual-body">${story()} ${fakeContent()}</div>
      </div>
    `,
  ],
};

// The API returns one config per language. The test configuration only exists once, so it is
// localized by marking the requested language as the active one in the language menu.
function getLocalizedTestConfiguration(language: string) {
  const { header } = testConfiguration;

  return {
    ...testConfiguration,
    header: {
      ...header,
      globalHeader: {
        ...header.globalHeader,
        languages: header.globalHeader.languages.map(lang => ({
          ...lang,
          active: lang.code.split('-')[0] === language,
        })),
      },
    },
  };
}

export function renderHeader({ innerHMTL, ...args }: Args = defaultArgs) {
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
