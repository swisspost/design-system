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
      <post-header>
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

        <!-- Global controls (Search) -->
        <ul slot="global-nav-primary">
          <li>
            <a href="">
              <span>Search</span>
              <post-icon aria-hidden="true" name="search"></post-icon>
            </a>
          </li>
        </ul>

        <!-- Global secondary navigation -->
        <ul slot="global-nav-secondary">
          <li>
            <a href="">
              Jobs
              <post-icon name="jobs" aria-hidden="true"></post-icon>
            </a>
          </li>
          <li>
            <a href="">
              Create Account
              <post-icon name="adduser" aria-hidden="true"></post-icon>
            </a>
          </li>
        </ul>

        <!-- Language menu -->
        <post-language-menu
          text-change-language="Change the language"
          text-current-language="The currently selected language is #name."
          variant="list"
          name="language-menu-example"
          slot="language-menu"
        >
          <post-language-menu-item code="de" name="German">de</post-language-menu-item>
          <post-language-menu-item code="fr" name="French">fr</post-language-menu-item>
          <post-language-menu-item code="it" name="Italian">it</post-language-menu-item>
          <post-language-menu-item active="true" code="en" name="English"
            >en</post-language-menu-item
          >
        </post-language-menu>

        <!-- Global header login/user menu -->

        <a href="" slot="post-login">
          <span>Login</span>
          <post-icon name="login"></post-icon>
        </a>

        <!-- Menu button for mobile -->
        <post-togglebutton slot="post-togglebutton">
          <span>Menu</span>
          <post-icon aria-hidden="true" name="burger" data-showwhen="untoggled"></post-icon>
          <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
        </post-togglebutton>

        <!-- Language menu -->
        <post-language-menu
          text-change-language="Change the language"
          text-current-language="The currently selected language is #name."
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
                <post-list>
                  <p>Send letters</p>
                  <post-list-item slot="post-list-item">
                    <a href="/sch">Letters Switzerland</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Express and courier</a>
                  </post-list-item>
                </post-list>
                <post-list>
                  <p><a href="/step-by-step">Step by step</a></p>
                  <post-list-item slot="post-list-item">
                    <a href="/sch">Packages Switzerland</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Express and courier</a>
                  </post-list-item>
                </post-list>
              </post-megadropdown>
            </li>
            <li>
              <post-megadropdown-trigger for="pakete">Pakete</post-megadropdown-trigger>
              <post-megadropdown id="pakete" text-close="Schliessen" text-back="Back">
                <post-list>
                  <p>Send packages</p>
                  <post-list-item slot="post-list-item">
                    <a href="/sch">Packages Switzerland</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Express and courier</a>
                  </post-list-item>
                </post-list>
                <post-list>
                  <p><a href="/step-by-step">Step by step</a></p>
                  <post-list-item slot="post-list-item">
                    <a href="/sch">Packages Switzerland</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </post-list-item>
                  <post-list-item slot="post-list-item">
                    <a href="">Express and courier</a>
                  </post-list-item>
                </post-list>
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
