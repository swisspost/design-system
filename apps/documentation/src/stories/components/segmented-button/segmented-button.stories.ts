import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const MAX_LABELS = 8;
const ICON_NAMES = [
  'letter',
  'parcel',
  'letterandparcel',
  'locationpackage',
  'locationletter',
  'stampapost',
  'stampbpost',
  'mailboxprivate',
];

const meta: MetaComponent = {
  id: '78509712-d45e-462c-bde3-405cfaff5421',
  title: 'Components/Segmented button',
  tags: ['package:Styles', 'status:New'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=18-16&m=dev',
    },
  },
  args: {
    labelCount: 4,
    content: 'text',
  },
  argTypes: {
    labelCount: {
      name: 'Number of segments',
      description: `Defines the number of segments for the segmented button. The maximum number of supported segments is 8. If you need more options, please refer to the select component.`,
      control: { type: 'number', min: 1, max: MAX_LABELS },
      table: { category: 'Content' },
    },
    content: {
      name: 'Content',
      description: 'Defines whether the segments display a text, an icon, or both.',
      control: {
        type: 'radio',
        labels: {
          'text': 'Text only',
          'icon': 'Icon only',
          'text-icon': 'Text + Icon',
        },
      },
      options: ['text', 'icon', 'text-icon'],
      table: { category: 'Content' },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const labelCount = Math.min(args.labelCount || 0, MAX_LABELS);
    const name = `segmented-button-${Math.random().toString(36).slice(-6)}`;
    const showIcon = args.content !== 'text';
    const showText = args.content !== 'icon';

    return html`
      <div class="segmented-button-container">
        <fieldset class="segmented-button">
          <legend>Choose one of the options</legend>
          ${Array.from({ length: labelCount }, (_, index) => {
            const label = `Label ${index + 1}`;
            return html`
              <label class="segmented-button-label">
                <input name="${name}" type="radio" checked="${index === 0 ? '' : nothing}" />
                ${showIcon
                  ? html`<post-icon
                      name="${ICON_NAMES[index % ICON_NAMES.length]}"
                      aria-hidden="true"
                    ></post-icon>`
                  : nothing}
                ${showText ? label : html`<span class="visually-hidden">${label}</span>`}
              </label>
            `;
          })}
        </fieldset>
      </div>
    `;
  },
};
