import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { StoryContext, StoryFn } from '@storybook/web-components';

const meta: MetaComponent<HTMLPostMegadropdownElement> = {
  id: '212efc4e-875b-4497-912d-d28c6baf32f5',
  title: 'Raw Components/Megadropdown',
  tags: ['package:WebComponents'],
  component: 'post-megadropdown',
  render: render,
  decorators: [decorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2908-30413&m=dev',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

function decorator(story: StoryFn, context: StoryContext) {
  return html`
    <post-mainnavigation>
      <post-list title-hidden="">
        <post-list-item> ${story(context.args, context)} </post-list-item>
      </post-list>
    </post-mainnavigation>
  `;
}

// RENDERERS
function render() {
  return html`
    <post-megadropdown-trigger for="pakete">Pakete</post-megadropdown-trigger>
    <post-megadropdown id="pakete">
      <button slot="back-button" class="btn btn-tertiary px-0">
        <post-icon name="arrowright"></post-icon>
        Zurück
      </button>
      <post-closebutton slot="close-button">Schliessen</post-closebutton>
      <h2 slot="megadropdown-title"><a href="">Pakete title</a></h2>
      <post-list>
        <h3>Pakete senden</h3>
        <post-list-item><a href="/sch">Pakete Schweiz</a></post-list-item>
        <post-list-item><a href="/kl">Kleinwaren Ausland</a></post-list-item>
        <post-list-item><a href="">Waren Ausland</a></post-list-item>
        <post-list-item><a href="">Express und Kurier</a></post-list-item>
      </post-list>
      <post-list>
        <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
        <post-list-item><a href="/sch">Pakete Schweiz</a></post-list-item>
        <post-list-item><a href="/kl">Kleinwaren Ausland</a></post-list-item>
        <post-list-item><a href="">Waren Ausland</a></post-list-item>
        <post-list-item><a href="">Express und Kurier</a></post-list-item>
      </post-list>
    </post-megadropdown>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageOptionElement>;

export const Default: Story = {};
