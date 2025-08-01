import type { StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html } from 'lit';
import { fakeContent } from '@/utils';

const meta: MetaComponent = {
  id: '27a2e64d-55ba-492d-ab79-5f7c5e818498',
  title: 'Components/Header',
  tags: ['package:WebComponents'],
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
    title: 'Application title',
    metaNavigation: true,
    customControls: true,
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
    metaNavigation: {
      name: 'Meta navigation',
      description: 'Whether or not the meta navigation is displayed ("about us" and "jobs").',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    customControls: {
      name: 'Custom controls',
      description: 'Whether or not the custom controls are displayed ("search" and "login").',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
  },
  decorators: [
    story =>
      html` <div class="header-story-wrapper">
        <div class="virtual-body">${story()} ${fakeContent()}</div>
      </div>`,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => {
    return html`<post-header>
      <!-- Logo -->
      <post-logo slot="post-logo" url="/">Homepage</post-logo>

      ${args.metaNavigation
        ? html`
            <!-- Meta navigation -->
            <ul class="list-inline" slot="meta-navigation">
              <li><a href="">Jobs</a></li>
              <li><a href="">About us</a></li>
            </ul>
          `
        : ''}

      <!-- Menu button for mobile -->
      <post-togglebutton slot="post-togglebutton">
        <span class="visually-hidden-sm">Menu</span>
        <post-icon aria-hidden="true" name="burger" data-showWhen="untoggled"></post-icon>
        <post-icon aria-hidden="true" name="closex" data-showWhen="toggled"></post-icon>
      </post-togglebutton>

      <!-- Language switch -->
      <post-language-switch
        caption="Change the language"
        description="The currently selected language is English."
        variant="list"
        name="language-switch-example"
        slot="post-language-switch"
      >
        <post-language-option active="false" code="de" name="German">de</post-language-option>
        <post-language-option active="false" code="fr" name="French">fr</post-language-option>
        <post-language-option active="false" code="it" name="Italian">it</post-language-option>
        <post-language-option active="true" code="en" name="English">en</post-language-option>
      </post-language-switch>

      ${args.title
        ? html`
            <!-- Application title (optional) -->
            <h1 slot="title">${args.title}</h1>
          `
        : ''}
      ${args.customControls
        ? html`
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
          `
        : ''}

      <!-- Main navigation -->
      <post-mainnavigation caption="Main navigation">
        <post-list title-hidden="">
          <h2>Main Navigation</h2>
          <!-- Link only level 1 -->
          <post-list-item slot="post-list-item"><a href="/letters">Letters</a></post-list-item>
          <post-list-item slot="post-list-item"><a href="/packages">Packages</a></post-list-item>

          <!-- Level 1 with megadropdown -->
          <post-list-item slot="post-list-item">
            <post-megadropdown-trigger for="letters">Letters</post-megadropdown-trigger>
            <post-megadropdown id="letters">
              <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
                <post-icon name="arrowleft"></post-icon>
                Back
              </button>
              <post-closebutton slot="close-button">Close</post-closebutton>
              <h2 slot="megadropdown-title">Letters title</h2>
              <post-list>
                <h3>Send letters</h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Letters Switzerland</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Small items abroad</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Goods abroad</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express and courier</a></post-list-item
                >
              </post-list>
              <post-list>
                <h3><a href="/step-by-step">Step by step</a></h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Packages Switzerland</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Small items abroad</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Goods abroad</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express and courier</a></post-list-item
                >
              </post-list>
            </post-megadropdown>
          </post-list-item>
          <post-list-item slot="post-list-item">
            <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
            <post-megadropdown id="packages">
              <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
                <post-icon name="arrowleft"></post-icon>
                Back
              </button>
              <post-closebutton slot="close-button">Close</post-closebutton>
              <h2 slot="megadropdown-title">Packages title</h2>
              <post-list>
                <h3>Send packages</h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Packages Switzerland</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Small items abroad</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Goods abroad</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express and courier</a></post-list-item
                >
              </post-list>
              <post-list>
                <h3><a href="/step-by-step">Step by step</a></h3>
                <post-list-item slot="post-list-item"
                  ><a href="/sch">Packages Switzerland</a></post-list-item
                >
                <post-list-item slot="post-list-item"
                  ><a href="/kl">Small items abroad</a></post-list-item
                >
                <post-list-item slot="post-list-item"><a href="">Goods abroad</a></post-list-item>
                <post-list-item slot="post-list-item"
                  ><a href="">Express and courier</a></post-list-item
                >
              </post-list>
            </post-megadropdown>
          </post-list-item>
        </post-list>
      </post-mainnavigation>
    </post-header>`;
  },
};
