import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html } from 'lit';
import { fakeContent } from '@/utils';

const meta: MetaComponent = {
  id: '1a1b4cab-d0a8-4b01-bd85-b70e18668cb5',
  title: 'Components/Button Back-to-Top',
  component: 'post-back-to-top',
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=18-11',
    },
  },
  render: () =>
    html`<div>
      <post-header text-menu="Menu">
        <!-- Logo -->
        <post-logo slot="post-logo" url="/">Homepage</post-logo>

        <!-- Target Group -->
        <ul slot="audience">
          <li>
            <a href="#" aria-current="location">Private customers</a>
          </li>
          <li>
            <a href="#">Business customers</a>
          </li>
        </ul>

        <!-- Language menu -->
        <post-language-menu
          text-change-language="Change the language"
          text-current-language="The currently selected language is English."
          variant="list"
          name="language-menu-example"
          slot="language-menu"
        >
          <post-language-menu-item active="false" code="de" name="Deutsch"
            >de</post-language-menu-item
          >
          <post-language-menu-item active="false" code="fr" name="French"
            >fr</post-language-menu-item
          >
          <post-language-menu-item active="false" code="it" name="Italiano"
            >it</post-language-menu-item
          >
          <post-language-menu-item active="true" code="en" name="English"
            >en</post-language-menu-item
          >
        </post-language-menu>

        <!-- Application title (optional) -->
        <p slot="title">Application title</p>

        <!-- Local controls (optional) -->
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
        <!-- Caption (textName) best practice: Don't include "navigation", screen readers add it automatically.
         e.g. text-main="Main" → "Main navigation" -->
        <post-mainnavigation slot="main-nav" text-main="Main">
          <ul>
            <!-- Link only level 1 -->
            <li>
              <a href="/letters">Letters</a>
            </li>
            <li>
              <a href="/packages">Packages</a>
            </li>

            <!-- Level 1 with megadropdown -->
            <li>
              <post-megadropdown-trigger for="briefe">Briefe</post-megadropdown-trigger>
              <post-megadropdown id="briefe" text-close="Schliessen" text-back="Back">
                <div class="row row-cols-1 row-cols-sm-2">
                  <div class="col">
                    <p class="post-megadropdown-list-title" id="send-letters">Briefe senden</p>
                    <ul class="post-megadropdown-list" aria-labelledby="send-letters">
                      <li>
                        <a href="/sch">Briefe Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col">
                    <a
                      class="post-megadropdown-list-title"
                      id="step-by-step-letters"
                      href="/schritt-für-schritt"
                      >Schritt für Schritt</a
                    >
                    <ul class="post-megadropdown-list" aria-labelledby="step-by-step-letters">
                      <li>
                        <a href="/sch">Pakete Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </post-megadropdown>
            </li>
            <li>
              <post-megadropdown-trigger for="pakete">Pakete</post-megadropdown-trigger>
              <post-megadropdown id="pakete" text-close="Schliessen" text-back="Back">
                <div class="row row-cols-1 row-cols-sm-2">
                  <div class="col">
                    <p class="post-megadropdown-list-title" id="send-packages">Pakete senden</p>
                    <ul class="post-megadropdown-list" aria-labelledby="send-packages">
                      <li>
                        <a href="/sch">Pakete Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col">
                    <a
                      class="post-megadropdown-list-title"
                      id="step-by-step-packages"
                      href="/schritt-für-schritt"
                      >Schritt für Schritt</a
                    >
                    <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
                      <li>
                        <a href="/sch">Pakete Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </post-megadropdown>
            </li>
          </ul>
        </post-mainnavigation>
      </post-header>
      ${fakeContent(17)}
      <post-back-to-top text-back-to-top="Back to top" />
    </div>`,
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html` ${story(args, context)} `,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
