import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html, nothing, TemplateResult } from 'lit';
import { fakeContent } from '@/utils';
import { renderMainnavigation } from '@/stories/components/header/renderers/main-navigation';
import { renderMetaNavigation } from '@/stories/components/header/renderers/meta-navigation';
import { renderTargetGroup } from '@/stories/components/header/renderers/target-group';
import { renderMicrositeControls } from '@/stories/components/header/renderers/microsite-controls';
import { renderJobControls } from '@/stories/components/header/renderers/job-controls';
import { renderUserMenu } from '@/stories/components/header/renderers/user-menu';
import { renderTitle } from '@/stories/components/header/renderers/title';

const meta: MetaComponent = {
  id: '27a2e64d-55ba-492d-ab79-5f7c5e818498',
  title: 'Components/Header',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-header',
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7012&t=ywmfJhyvd2euoiGI-1',
    },
  },
  args: {
    title: '',
    titleTag: 'p',
    mainNavigation: true,
    metaNavigation: true,
    globalControls: true,
    targetGroup: true,
    globalLogin: true,
    localNav: false,
    isLoggedIn: false,
    jobs: false,
  },
  argTypes: {
    title: {
      name: 'Application title',
      description: 'Title of the webpage or application.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    titleTag: {
      name: 'Application title tag',
      description: 'HTML tag used for the title of the webpage or application.',
      control: {
        type: 'inline-radio',
      },
      options: ['p', 'h1'],
      if: {
        arg: 'title',
        neq: '',
      },
      table: {
        category: 'Content',
      },
    },
    mainNavigation: {
      name: 'Main navigation',
      description: 'Whether or not the main navigation is displayed.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    globalControls: {
      name: 'Global controls',
      description: 'Whether or not the search button in the global header is displayed.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    globalLogin: {
      name: 'Global login',
      description: 'Whether or not the user menu or login button in the global header is displayed',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    metaNavigation: {
      name: 'Meta navigation',
      description:
        'Whether or not the meta navigation is displayed ("jobs" and "create an account").',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    targetGroup: {
      name: 'Target group',
      description: 'Whether or not the target group buttons are visible.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    localNav: {
      name: 'Local controls',
      description:
        'Whether or not application-specific controls are displayed ("search" and "login").',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
      if: {
        arg: 'jobs',
        truthy: false,
      },
    },
    isLoggedIn: {
      name: 'Is logged in',
      description: 'Whether the user is logged in or not.',
      control: {
        type: 'boolean',
      },
      table: { category: 'state' },
    },
    jobs: {
      name: 'Jobs',
      description: 'Whether the jobs is active or not.',
      control: {
        type: 'boolean',
      },
      table: { category: 'state' },
    },
  },
  decorators: [
    story =>
      html` <div class="header-story-wrapper">
        <div class="virtual-body">
          ${story()}
          <section
            class="group palette py-32 sm:py-40 md:py-48 lg:py-56 xl:py-64 palette-default scroll-mt-[var(--post-header-reduced-height)]"
          >
            <div class="container">
              <div>
                <p class="lead">
                  Swiss Post Cargo bietet Ihnen flexible und auf Ihre Branche zugeschnittene
                  Transport- und Lagerlösungen in ganz Europa. Mit projektbezogenen Dienstleistungen
                  unterstützen wir Industrie und Handel. Von der Automobil- und Pharmaindustrie über
                  Lebensmittel-, Möbel- und Modeunternehmen bis zur Bau- und Elektronikbranche: Wir
                  kümmern uns um die Verzollung, führen Nacht- und Expresslieferungen durch und
                  bieten effizientes Crossdocking sowie branchenspezifische Lösungen. Zuverlässig,
                  umweltbewusst und vollintegriert in die Prozesse Ihrer Value Chain.
                </p>
              </div>
            </div>
          </section>
          <section
            class="group palette py-32 sm:py-40 md:py-48 lg:py-56 xl:py-64 palette-alternate scroll-mt-[var(--post-header-reduced-height)]"
            id="die-passende-logistikpartnerin-fur-ihre-branche"
          >
            <div class="container">
              <header class="mb-16 sm:bt-24 lg:mb-32 last:mb-0">
                <div
                  class="flex flex-col xl:gap-32 gap-24 lg:flex-row lg:items-end lg:justify-between"
                >
                  <div class="w-full sm:col-lg-9">
                    <h2 class="h2 palette-text palette-text !mb-4 sm:!mb-8">
                      Die passende Logistikpartnerin für Ihre Branche
                    </h2>
                  </div>
                </div>
              </header>
              <div>
                <ul class="list-bullet">
                  <li>
                    Einbindung in Ihre Value Chain und Unterstützung bei branchenspezifischen
                    Lösungen wie Konfektionierung, Aufstellservice, Rücknahmen und Entsorgung
                  </li>
                  <li>
                    Zertifizierte Lager- und Transportlösungen für Gefahrgut und
                    temperaturempfindliche Güter
                  </li>
                  <li>
                    Erforderliche Zulassungen für Gefahrgut (ADR Dangerous Goods by Road) in festem,
                    flüssigem oder pastösem Zustand sind vorhanden
                  </li>
                  <li>
                    Lagerung erfolgt gekühlt, temperaturgeführt und bei Bedarf in
                    High-Security-Zonen
                  </li>
                  <li>
                    Flexibler Lagerplatz für Lang-, Schwer- und Gefahrgut mit passender
                    Infrastruktur wie Kran, Innen- und Aussenlager, Umschlagplätzen und Autostore
                  </li>
                </ul>
              </div>
            </div>
          </section>
          ${fakeContent()}
        </div>
      </div>`,
  ],
  render: getHeaderRenderer(),
};

function getHeaderRenderer(
  subComponents: {
    mainnavigation?: TemplateResult;
    userMenu?: TemplateResult;
    title?: TemplateResult;
  } = {},
) {
  return (args: Args) => {
    const mainnavigation = subComponents.mainnavigation ?? renderMainnavigation();
    const userMenu = subComponents.userMenu ?? renderUserMenu();
    const title = subComponents.title ?? renderTitle(args);

    const globalLogin = args.isLoggedIn
      ? html` <div slot="global-login">${userMenu}</div> `
      : html`
          <a href="" slot="global-login">
            <span>Login</span>
            <post-icon name="login"></post-icon>
          </a>
        `;

    const globalControls = html`
      <!-- Global controls (Search) -->
      <ul slot="global-controls">
        <li>
          <a href="">
            <span>Search</span>
            <post-icon aria-hidden="true" name="search"></post-icon>
          </a>
        </li>
      </ul>
    `;

    return html`
      <post-header>
        <!-- Logo -->
        <post-logo slot="post-logo" url="/">Homepage</post-logo>

        ${args.targetGroup ? renderTargetGroup(args) : nothing}
        ${args.globalControls && !args.jobs ? globalControls : nothing}
        ${args.metaNavigation ? renderMetaNavigation(args) : nothing}

        <!-- Language switch -->
        <post-language-switch
          caption="Change the language"
          description="The currently selected language is English."
          variant="list"
          name="language-switch-example"
          slot="post-language-switch"
        >
          <post-language-option code="de" name="German">de</post-language-option>
          <post-language-option code="fr" name="French">fr</post-language-option>
          <post-language-option code="it" name="Italian">it</post-language-option>
          <post-language-option active="true" code="en" name="English">en</post-language-option>
        </post-language-switch>

        ${!args.title && !args.jobs
          ? html`
              <!-- Global header login/user menu -->
              ${globalLogin}
            `
          : nothing}

        <!-- Menu button for mobile -->
        <post-togglebutton slot="post-togglebutton">
          <span>Menu</span>
          <post-icon aria-hidden="true" name="burger" data-showWhen="untoggled"></post-icon>
          <post-icon aria-hidden="true" name="closex" data-showWhen="toggled"></post-icon>
        </post-togglebutton>

        ${args.title !== '' ? title : nothing}
        ${args.localNav ? renderMicrositeControls(args) : nothing}
        ${args.mainNavigation ? mainnavigation : nothing}
        ${args.jobs ? renderJobControls() : nothing}
      </post-header>
    `;
  };
}

function getIframeParameters(iframeHeight: number) {
  return {
    parameters: {
      docs: {
        story: {
          inline: false,
          iframeHeight,
        },
      },
    },
  };
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const ActiveNavigationItem: Story = {
  ...getIframeParameters(250),
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const renderHeader = getHeaderRenderer({
        mainnavigation: html` ${story(context.args, context)} `,
      });
      return renderHeader(context.args);
    },
  ],
  render: () => html`
    <post-mainnavigation slot="post-mainnavigation" caption="Main navigation">
      <post-list title-hidden="">
        <p>Main Navigation</p>
        <post-list-item slot="post-list-item">
          <a href="/letters">Letters</a>
        </post-list-item>

        <post-list-item slot="post-list-item">
          <!-- The active link must have an aria-current="page" attribute to ensure correct accessibility and styling. -->
          <a href="/packages" aria-current="page">Packages</a>
        </post-list-item>
      </post-list>
    </post-mainnavigation>
  `,
};

export const Portal: Story = {
  ...getIframeParameters(550),
};

export const Jobs: Story = {
  ...getIframeParameters(550),
  args: {
    jobs: true,
  },
};

export const Microsite: Story = {
  ...getIframeParameters(550),
  args: {
    title: '[Microsite Title]',
    mainNavigation: true,
    globalControls: false,
    metaNavigation: false,
    globalLogin: false,
    targetGroup: false,
    localNav: true,
  },
};

export const OnePager: Story = {
  ...getIframeParameters(250),
  args: {
    title: '[One Pager Title]',
    mainNavigation: false,
    metaNavigation: false,
    globalControls: false,
    localNav: false,
    globalLogin: false,
    targetGroup: false,
  },
};

export const OnePagerH1: Story = {
  ...getIframeParameters(250),
  args: {
    ...OnePager.args,
    titleTag: 'h1',
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const renderHeader = getHeaderRenderer({
        title: html` ${story(context.args, context)} `,
      });
      return renderHeader(context.args);
    },
  ],
  render: renderTitle,
};

// Used in target group documentation
export const WithTargetGroup: Story = {
  args: {
    targetGroup: true,
  },
};

// User is logged in
export const LoggedIn: Story = {
  ...getIframeParameters(400),
  args: {
    isLoggedIn: true,
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const renderHeader = getHeaderRenderer({
        userMenu: html` ${story(context.args, context)} `,
      });
      return renderHeader(context.args);
    },
  ],
  render: () => renderUserMenu(),
};

// User is logged out
export const LoggedOut: Story = {
  ...getIframeParameters(200),
  args: {
    isLoggedIn: false,
  },
};
