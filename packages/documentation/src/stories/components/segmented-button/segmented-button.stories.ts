import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const MAX_LABELS = 8;

const meta: MetaComponent = {
  id: '78509712-d45e-462c-bde3-405cfaff5421',
  title: 'Components/Buttons/Segmented button',
  tags: ['package:HTML'],
  render: renderSegmentedButton,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2864-83396&node-type=instance&m=dev',
    },
  },
  args: {
    labelCount: 5,
  },
  argTypes: {
    labelCount: {
      name: 'Label Count',
      description: `Specifies the number of labels for the segmented button.`,
      control: { type: 'number', min: 1, max: MAX_LABELS },
      table: { category: 'Content' },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderSegmentedButton(args: Args) {
  const labelCount = Math.min(args.labelCount || 0, MAX_LABELS);
  const labelsArray = Array.from({ length: labelCount }, (_, i) => `Label ${i + 1}`);

  return html`
    <div class="segmented-button-container">
      <fieldset class="segmented-button">
        ${labelsArray.map(
          (label, index) => html`
            <label class="segmented-button-label">
              <input 
                name={uuid}
                type="radio" 
              />
              ${label}
            </label>
          `
        )}
      </fieldset>
    </div>
  `;
}

export const Default: Story = {
  args: {
    labelCount: 5,
  },
};
