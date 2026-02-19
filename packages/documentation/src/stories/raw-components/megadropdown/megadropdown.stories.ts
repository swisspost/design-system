import type { StoryObj } from '@storybook/web-components-vite';
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
    labelClose: 'Close',
    labelBack: 'Back',
  },
  argTypes: {},
};

export default meta;

export function megadropdownDecorator(story: StoryFn, context: StoryContext) {
  return html`
    <post-header text-menu="Menu">
      <!-- Logo -->
      <post-logo slot="post-logo" url="/">Homepage</post-logo>

      <!-- Meta navigation -->
      <ul slot="global-nav-secondary">
        <li><a href="">Jobs</a></li>
        <li><a href="">About us</a></li>
      </ul>

      <!-- Language switch -->
      <post-language-menu
        text-change-language="Change the language"
        text-current-language="The currently selected language is #name."
        name="language-menu-example"
        slot="language-menu"
      >
        <post-language-menu-item active="true" code="de" name="German">DE</post-language-menu-item>
        <post-language-menu-item active="false" code="fr" name="French">FR</post-language-menu-item>
        <post-language-menu-item active="false" code="it" name="Italian"
          >IT</post-language-menu-item
        >
        <post-language-menu-item active="false" code="en" name="English"
          >EN</post-language-menu-item
        >
      </post-language-menu>

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
      <post-mainnavigation slot="main-nav" text-main="Main">
        <ul>
          <li>${story(context.args, context)}</li>
        </ul>
      </post-mainnavigation>
    </post-header>
    <div class="container">
      <p class="fake-content"></p>
      <p class="fake-content"></p>
    </div>
  `;
}

function render() {
  return html`
    <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
    <post-megadropdown id="packages" text-close="Close" text-back="Back">
      <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>
      <div class="row row-cols-1 row-cols-sm-2">
        <div class="col">
          <p class="post-megadropdown-list-title" id="send-packages">Send packages</p>
          <ul class="post-megadropdown-list" aria-labelledby="send-packages">
            <li><a href="/sch">Packages Switzerland</a></li>
            <li><a href="/kl">Small goods international</a></li>
            <li><a href="">Goods international</a></li>
            <li><a href="">Express and courier</a></li>
          </ul>
        </div>
        <div class="col">
          <a class="post-megadropdown-list-title" id="step-by-step-packages" href="/step-by-step"
            >Step by step</a
          >
          <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
            <li><a href="/sch">Packages Switzerland</a></li>
            <li><a href="/kl">Small goods international</a></li>
            <li><a href="">Goods international</a></li>
            <li><a href="">Express and courier</a></li>
          </ul>
        </div>
      </div>
    </post-megadropdown>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageMenuItemElement>;

export const Default: Story = {
  decorators: [megadropdownDecorator],
};

// No decorators on the test page
export const Tests: Story = {};
