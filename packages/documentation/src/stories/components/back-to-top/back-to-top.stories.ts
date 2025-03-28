import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '@root/types';
import { html } from 'lit';
import { fakeContent } from '@/utils';

const meta: MetaComponent = {
  id: '1a1b4cab-d0a8-4b01-bd85-b70e18668cb5',
  title: 'Components/Button Back-to-Top',
  component: 'post-back-to-top',
  tags: ['package:WebComponents'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=18-11',
    },
  },
  render: () => html`<div>
    <post-header>
      <!-- Logo -->
      <post-logo slot="post-logo" url="/">Homepage</post-logo>

      <!-- Meta navigation -->
      <ul class="list-inline" slot="meta-navigation">
        <li><a href="">Jobs</a></li>
        <li><a href="">Über uns</a></li>
      </ul>

      <!-- Menu button for mobile -->
      <post-togglebutton slot="post-togglebutton">
        <span class="visually-hidden-sm">Menu</span>
        <post-icon aria-hidden="true" name="burger" data-showwhen="untoggled"></post-icon>
        <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
      </post-togglebutton>

      <!-- Language switch -->
      <post-language-switch
        caption="Change the language"
        description="The currently selected language is English."
        variant="list"
        name="language-switch-example"
        slot="post-language-switch"
      >
        <post-language-option active="false" code="de" name="Deutsch">de</post-language-option>
        <post-language-option active="false" code="fr" name="French">fr</post-language-option>
        <post-language-option active="false" code="it" name="Italiano">it</post-language-option>
        <post-language-option active="true" code="en" name="English">en</post-language-option>
      </post-language-switch>

      <!-- Application title (optional) -->
      <h1 slot="title">Application title</h1>

      <!-- Custom content (optional) -->
      <ul class="list-inline">
        <li>
          <a href="#">
            <span class="visually-hidden-sm">Search</span>
            <post-icon aria-hidden="true" name="search"></post-icon>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="visually-hidden-sm">Login</span>
            <post-icon aria-hidden="true" name="login"></post-icon>
          </a>
        </li>
      </ul>

      <!-- Main navigation -->
      <post-mainnavigation caption="Hauptnavigation">
        <button type="button" slot="back-button" class="btn btn-sm btn-tertiary">
          <post-icon aria-hidden="true" name="arrowright"></post-icon> Back
        </button>
        <post-list title-hidden="">
          <h2>Main Navigation</h2>
          <!-- Link only level 1 -->
          <post-list-item slot="post-list-item"><a href="/briefe">Briefe</a></post-list-item>
          <post-list-item slot="post-list-item"><a href="/pakete">Pakete</a></post-list-item>

          <!-- Level 1 with megadropdown -->
          <post-list-item slot="post-list-item">
            <post-megadropdown-trigger for="briefe">Briefe</post-megadropdown-trigger>
            <post-megadropdown id="briefe">
              <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
                <post-icon name="arrowright"></post-icon>
                Back
              </button>
              <post-closebutton slot="close-button">Schliessen</post-closebutton>
              <h2 slot="megadropdown-title">Briefe title</h2>
              <post-list>
                <h3>Briefe senden</h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Briefe Schweiz</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Kleinwaren Ausland</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express und Kurier</a></post-list-item
                >
              </post-list>
              <post-list>
                <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Pakete Schweiz</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Kleinwaren Ausland</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express und Kurier</a></post-list-item
                >
              </post-list>
            </post-megadropdown>
          </post-list-item>
          <post-list-item slot="post-list-item">
            <post-megadropdown-trigger for="pakete">Pakete</post-megadropdown-trigger>
            <post-megadropdown id="pakete">
              <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
                <post-icon name="arrowright"></post-icon>
                Back
              </button>
              <post-closebutton slot="close-button">Schliessen</post-closebutton>
              <h2 slot="megadropdown-title">Pakete title</h2>
              <post-list>
                <h3>Pakete senden</h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Pakete Schweiz</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Kleinwaren Ausland</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express und Kurier</a></post-list-item
                >
              </post-list>
              <post-list>
                <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Pakete Schweiz</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Kleinwaren Ausland</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express und Kurier</a></post-list-item
                >
              </post-list>
            </post-megadropdown>
          </post-list-item>
        </post-list>
      </post-mainnavigation>
    </post-header>
    ${fakeContent(17)}
    <post-back-to-top label="Back to top button" />
  </div>`,
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html` ${story(args, context)} `,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
