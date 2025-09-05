import type { Args, StoryObj } from '@storybook/web-components-vite';
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
    mode: 'text',
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
      name: 'Content mode',
      description: 'Choose how each segment renders its content.',
      control: { type: 'inline-radio' },
      options: ['text', 'icon', 'text+icon'],
      table: { category: 'Content' },
    },
  },
};

export default meta;

type Story = StoryObj;

const Template = {
  render: (args: Args) => {
    const mode = args.mode || 'text';
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
                ${mode === 'icon' || mode === 'text+icon'
                  ? html`<post-icon name="${1000 + index}"></post-icon>`
                  : nothing}
                ${mode === 'text' || mode === 'text+icon' ? label : nothing}
              </label>
            `,
          )}
        </fieldset>
      </div>
    `;
  },
};

export const Default: Story = {
  ...Template,
};

export const Icon: Story = {
  ...Template,
  args: { mode: 'icon' },
};

export const TextAndIcon: Story = {
  ...Template,
  args: { mode: 'text+icon' },
};
