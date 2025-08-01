import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { StoryContext, StoryFn } from '@storybook/web-components-vite';

const meta: MetaComponent<HTMLPostMegadropdownElement> = {
  id: '212efc4e-875b-4497-912d-d28c6baf32f5',
  title: 'Raw Components/Megadropdown',
  tags: ['package:WebComponents', 'devOnly'],
  component: 'post-megadropdown',
  render: render,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2908-30413&m=dev',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

export function megadropdownDecorator(story: StoryFn, context: StoryContext) {
  return html`
    <post-header>
      <!-- Logo -->
      <post-logo slot="post-logo" url="/">Homepage</post-logo>

      <!-- Meta navigation -->
      <ul class="list-inline" slot="meta-navigation">
        <li><a href="">Jobs</a></li>
        <li><a href="">About us</a></li>
      </ul>

      <!-- Menu button for mobile -->
      <post-togglebutton slot="post-togglebutton">
        <span class="visually-hidden-sm">Menu</span>
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
      <post-mainnavigation caption="Main Navigation">
        <post-list title-hidden="">
          <h2>Main Navigation</h2>
          <post-list-item> ${story(context.args, context)} </post-list-item>
        </post-list>
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
    <post-megadropdown id="packages">
      <button slot="back-button" class="btn btn-tertiary px-0">
        <post-icon name="arrowleft"></post-icon>
        Back
      </button>
      <post-closebutton slot="close-button">Close</post-closebutton>
      <h2 slot="megadropdown-title"><a href="">Packages title</a></h2>
      <post-list>
        <h3>Send packages</h3>
        <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
        <post-list-item><a href="/kl">Small goods international</a></post-list-item>
        <post-list-item><a href="">Goods international</a></post-list-item>
        <post-list-item><a href="">Express and courier</a></post-list-item>
      </post-list>
      <post-list>
        <h3><a href="/step-by-step">Step by step</a></h3>
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
