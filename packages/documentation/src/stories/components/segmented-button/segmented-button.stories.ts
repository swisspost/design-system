import type { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import type { MetaComponent } from '@root/types';

const MAX_LABELS = 8;

const meta: MetaComponent = {
  id: '78509712-d45e-462c-bde3-405cfaff5421',
  title: 'Components/Segmented button',
  tags: ['package:Styles'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2864-83396&node-type=instance&m=dev',
    },
  },
  args: {
    labelCount: 4,
    mode: 'Text only',
  },
  argTypes: {
    labelCount: {
      name: 'Number of segments',
      description:
        'Defines the number of segments for the segmented button. The maximum number of supported segments is 8. If you need more options, please refer to the select component.',
      control: { type: 'number', min: 1, max: MAX_LABELS },
      table: { category: 'Content' },
    },
    mode: {
      name: 'Content type',
      description: 'Defines the type of content displayed in the buttons.',
      control: { type: 'inline-radio' },
      options: ['Text only', 'Icons only', 'Text and icons'],
      table: { category: 'Content' },
    },
  },
  render: (args: Args) => {
    const mode = args.mode || 'Text only';
    const labelCount = Math.min(args.labelCount || 0, MAX_LABELS);
    const labels = Array.from({ length: labelCount }, (_, i) => `Label ${i + 1}`);
    const name = `segmented-button-${crypto.randomUUID().replace(/-/g, '').slice(-6)}`;

    return html`
      <div class="segmented-button-container">
        <fieldset class="segmented-button">
          <legend>Choose one of the options</legend>
          ${labels.map(
            (label, index) => html`
              <label class="segmented-button-label">
                <input type="radio" name="${name}" ?checked=${index === 0} />
                ${mode === 'Icons only'
                  ? html`<span class="visually-hidden">${label}</span>`
                  : nothing}
                ${mode === 'Icons only' || mode === 'Text and icons'
                  ? html`<post-icon name="${1000 + index}"></post-icon>`
                  : nothing}
                ${mode === 'Text only' || mode === 'Text and icons' ? label : nothing}
              </label>
            `,
          )}
        </fieldset>
      </div>
    `;
  },
};

export default meta;
export const Default = {};
export const Icon = { args: { mode: 'Icons only' } };
export const TextAndIcon = { args: { mode: 'Text and icons' } };
