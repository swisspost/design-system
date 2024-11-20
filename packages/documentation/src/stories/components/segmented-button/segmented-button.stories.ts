import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const MAX_LABELS = 8;

const meta: MetaComponent = {
  id: '78509712-d45e-462c-bde3-405cfaff5421',
  title: 'Components/Buttons/Segmented button',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2864-83396&node-type=instance&m=dev',
    },
  },
  args: {
    name: 'segmented-button-group',
    labelCount: 4,
  },
  argTypes: {
    name: {
      name: 'Name',
      description: `Specifies the name of the radio button group. Ensure this is unique.`,
      control: { type: 'text' },
      table: { category: 'General' },
    },
    labelCount: {
      name: 'Label Count',
      description: `Defines the number of labels for the segmented button.`,
      control: { type: 'number', min: 1, max: MAX_LABELS },
      table: { category: 'Content' },
    },
  },
};

export default meta;

type Story = StoryObj;

export const TextExample: Story = {
  render: (args: Args) => {
    const labelCount = Math.min(args.labelCount || 0, MAX_LABELS);
    const labelsArray = Array.from({ length: labelCount }, (_, i) => `Label ${i + 1}`);

    return html`
      <div class="segmented-button-container">
        <fieldset class="segmented-button">
          <legend>Choose one of the options</legend>
          ${labelsArray.map(
            (label) => html`
              <label class="segmented-button-label">
                <input name="${args.name}" type="radio" />
                ${label}
              </label>
            `
          )}
        </fieldset>
      </div>
    `;
  },
};

export const IconExample: Story = {
  render: (args: Args) => {
    const labelCount = Math.min(args.labelCount || 0, MAX_LABELS);

    return html`
      <div class="segmented-button-container">
        <fieldset class="segmented-button">
          <legend>Choose one of the options</legend>
          ${Array.from({ length: labelCount }, () => html`
          <label class="segmented-button-label">
            <input name="${args.name}" type="radio" />
              <post-icon name="3120" />
          </label>
          `)}
        </fieldset>
      </div>
    `;
  },
};
