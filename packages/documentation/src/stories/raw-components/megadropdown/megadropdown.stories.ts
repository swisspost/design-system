import type { StoryObj, Args } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { StoryContext, StoryFn } from '@storybook/web-components-vite';

const meta: MetaComponent<HTMLPostMegadropdownElement> = {
  id: '212efc4e-875b-4497-912d-d28c6baf32f5',
  title: 'Raw Components/Megadropdown',
  tags: ['package:WebComponents', 'status:Experimental', 'devOnly'],
  component: 'post-megadropdown',
  render: render,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2908-30413&m=dev',
    },
  },
  args: {
    x1_entry: 0.8,
    y1_entry: 0.2,
    x2_entry: 0.8,
    y2_entry: 0.7,
    duration_entry: 350,
    slide_down: 10,
    x1_exit: 0.8,
    y1_exit: 0.2,
    x2_exit: 0.8,
    y2_exit: 0.7,
    duration_exit: 350,
    slide_up: 10,
  },
  argTypes: {
    x1_entry: {
      name: 'x1',
      description: 'First control point (x) for the cubic-bezier easing curve.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Entry Animation',
      },
    },

    y1_entry: {
      name: 'y1',
      description: 'First control point (y) for the cubic-bezier easing curve.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Entry Animation',
      },
    },
    x2_entry: {
      name: 'x2',
      description: 'Second control point (x) for the cubic-bezier easing curve.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Entry Animation',
      },
    },

    y2_entry: {
      description: 'Second control point (x) for the cubic-bezier easing curve.',
      name: 'y2',
      control: {
        type: 'number',
      },
      table: {
        category: 'Entry Animation',
      },
    },
    duration_entry: {
      name: 'duration',
      control: {
        type: 'number',
      },
      table: {
        category: 'Entry Animation',
      },
    },
    slide_down: {
      name: 'Slide down (px)',
      control: {
        type: 'number',
      },
      table: {
        category: 'Entry Animation',
      },
    },
    x1_exit: {
      name: 'x1',
      description: 'First control point (x) for the cubic-bezier easing curve.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Exit Animation',
      },
    },

    y1_exit: {
      name: 'y1',
      description: 'First control point (y) for the cubic-bezier easing curve.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Exit Animation',
      },
    },
    x2_exit: {
      name: 'x2',
      description: 'Second control point (x) for the cubic-bezier easing curve.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Exit Animation',
      },
    },

    y2_exit: {
      name: 'y2',
      description: 'Second control point (y) for the cubic-bezier easing curve.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Exit Animation',
      },
    },
    duration_exit: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Exit Animation',
      },
    },
    slide_up: {
      name: 'Slide up (px)',
      control: {
        type: 'number',
      },
      table: {
        category: 'Exit Animation',
      },
    },
  },
};

export default meta;

export function megadropdownDecorator(story: StoryFn, context: StoryContext) {
  return html`
    <post-header>
      <!-- Logo -->
      <post-logo slot="post-logo" url="/">Homepage</post-logo>

      <!-- Meta navigation -->
      <ul slot="meta-navigation">
        <li><a href="">Jobs</a></li>
        <li><a href="">About us</a></li>
      </ul>

      <!-- Menu button for mobile -->
      <post-togglebutton slot="post-togglebutton">
        <span>Menu</span>
        <post-icon aria-hidden="true" name="burger" data-showwhen="untoggled"></post-icon>
        <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
      </post-togglebutton>

      <!-- Language switch -->
      <post-language-switch
        caption="Caption"
        description="Description"
        variant="list"
        name="language-switch-example"
        slot="post-language-switch"
      >
        <post-language-option active="true" code="de" name="German">DE</post-language-option>
        <post-language-option active="false" code="fr" name="French">FR</post-language-option>
        <post-language-option active="false" code="it" name="Italian">IT</post-language-option>
        <post-language-option active="false" code="en" name="English">EN</post-language-option>
      </post-language-switch>

      <!-- Application title (optional) -->
      <p slot="title">Application title</p>

      <!-- Custom content (optional) -->
      <ul slot="local-nav">
        <li>
          <a href="#">
            <span>Search</span>
            <post-icon aria-hidden="true" name="search"></post-icon>
          </a>
        </li>
        <li>
          <a href="#">
            <span>Login</span>
            <post-icon aria-hidden="true" name="login"></post-icon>
          </a>
        </li>
      </ul>

      <!-- Main navigation -->
      <post-mainnavigation slot="post-mainnavigation" caption="Main Navigation">
        <post-list title-hidden="">
          <p>Main Navigation</p>
          <post-list-item> ${story(context.args, context)} </post-list-item>
        </post-list>
      </post-mainnavigation>
    </post-header>
    <div class="container">
      <section
        class="group palette py-32 sm:py-40 md:py-48 lg:py-56 xl:py-64 palette-default scroll-mt-[var(--post-header-reduced-height)]"
      >
        <div class="container">
          <div>
            <p class="lead">
              Swiss Post Cargo bietet Ihnen flexible und auf Ihre Branche zugeschnittene Transport-
              und Lagerlösungen in ganz Europa. Mit projektbezogenen Dienstleistungen unterstützen
              wir Industrie und Handel. Von der Automobil- und Pharmaindustrie über Lebensmittel-,
              Möbel- und Modeunternehmen bis zur Bau- und Elektronikbranche: Wir kümmern uns um die
              Verzollung, führen Nacht- und Expresslieferungen durch und bieten effizientes
              Crossdocking sowie branchenspezifische Lösungen. Zuverlässig, umweltbewusst und
              vollintegriert in die Prozesse Ihrer Value Chain.
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
            <div class="flex flex-col xl:gap-32 gap-24 lg:flex-row lg:items-end lg:justify-between">
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
                Einbindung in Ihre Value Chain und Unterstützung bei branchenspezifischen Lösungen
                wie Konfektionierung, Aufstellservice, Rücknahmen und Entsorgung
              </li>
              <li>
                Zertifizierte Lager- und Transportlösungen für Gefahrgut und temperaturempfindliche
                Güter
              </li>
              <li>
                Erforderliche Zulassungen für Gefahrgut (ADR Dangerous Goods by Road) in festem,
                flüssigem oder pastösem Zustand sind vorhanden
              </li>
              <li>
                Lagerung erfolgt gekühlt, temperaturgeführt und bei Bedarf in High-Security-Zonen
              </li>
              <li>
                Flexibler Lagerplatz für Lang-, Schwer- und Gefahrgut mit passender Infrastruktur
                wie Kran, Innen- und Aussenlager, Umschlagplätzen und Autostore
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `;
}

function render(args: Args) {
  return html`
    <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
    <post-megadropdown
      id="packages"
      x1_entry="${args.x1_entry}"
      y1_entry="${args.y1_entry}"
      x2_entry="${args.x2_entry}"
      y2_entry="${args.y2_entry}"
      duration_entry="${args.duration_entry}"
      slide_down="${args.slide_down}"
      x1_exit="${args.x1_exit}"
      y1_exit="${args.y1_exit}"
      x2_exit="${args.x2_exit}"
      y2_exit="${args.y2_exit}"
      duration_exit="${args.duration_exit}"
      slide_up="${args.slide_up}"
    >
      <button slot="back-button" class="btn btn-tertiary px-0">
        <post-icon name="arrowleft"></post-icon>
        Back
      </button>
      <post-closebutton slot="close-button">Close</post-closebutton>
      <a slot="megadropdown-overview-link" href="/packages">Overview Packages</a>
      <post-list>
        <p>Send packages</p>
        <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
        <post-list-item><a href="/kl">Small goods international</a></post-list-item>
        <post-list-item><a href="">Goods international</a></post-list-item>
        <post-list-item><a href="">Express and courier</a></post-list-item>
      </post-list>
      <post-list>
        <p><a href="/step-by-step">Step by step</a></p>
        <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
        <post-list-item><a href="/kl">Small goods international</a></post-list-item>
        <post-list-item><a href="">Goods international</a></post-list-item>
        <post-list-item><a href="">Express and courier</a></post-list-item>
      </post-list>
    </post-megadropdown>
    <post-megadropdown-trigger for="letters">Letters</post-megadropdown-trigger>
    <post-megadropdown
      id="letters"
      x1_entry="${args.x1_entry}"
      y1_entry="${args.y1_entry}"
      x2_entry="${args.x2_entry}"
      y2_entry="${args.y2_entry}"
      duration_entry="${args.duration_entry}"
      slide_down="${args.slide_down}"
      x1_exit="${args.x1_exit}"
      y1_exit="${args.y1_exit}"
      x2_exit="${args.x2_exit}"
      y2_exit="${args.y2_exit}"
      duration_exit="${args.duration_exit}"
      slide_up="${args.slide_up}"
    >
      <button slot="back-button" class="btn btn-tertiary px-0">
        <post-icon name="arrowleft"></post-icon>
        Back
      </button>
      <post-closebutton slot="close-button">Close</post-closebutton>
      <a slot="megadropdown-overview-link" href="/packages">Overview Packages</a>
      <post-list>
        <p>Send packages</p>
        <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
        <post-list-item><a href="/kl">Small goods international</a></post-list-item>
        <post-list-item><a href="">Goods international</a></post-list-item>
        <post-list-item><a href="">Express and courier</a></post-list-item>
      </post-list>
      <post-list>
        <p><a href="/step-by-step">Step by step</a></p>
        <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
        <post-list-item><a href="/kl">Small goods international</a></post-list-item>
        <post-list-item><a href="">Goods international</a></post-list-item>
        <post-list-item><a href="">Express and courier</a></post-list-item>
      </post-list>
    </post-megadropdown>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageOptionElement>;

export const Default: Story = {
  decorators: [megadropdownDecorator],
};

// No decorators on the test page
export const Tests: Story = {};
