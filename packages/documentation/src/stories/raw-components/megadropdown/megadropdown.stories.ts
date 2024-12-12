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
  return html` <div class="megadropdown-container">${story(context.args, context)}</div> `;
}

// RENDERERS
function render() {
  return html`
    <post-megadropdown-trigger for="ddd">
      <button class="btn btn-link">Briefe</button>
    </post-megadropdown-trigger>
    <post-megadropdown id="ddd">
      <button slot="back-button" class="btn btn-link">
        <post-icon name="arrowright"></post-icon>
        Zurück
      </button>
      <post-closebutton slot="close-button">Schliessen</post-closebutton>
      <h2 slot="megadropdown-title"><a href="">Briefe title</a></h2>
      <post-list>
        <h3>Briefe senden</h3>
        <post-list-item><a href="/sch">Briefe Schweiz</a></post-list-item>
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
