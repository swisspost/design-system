import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const MAX_LABELS = 8;

const meta: MetaComponent = {
  id: '78509712-d45e-462c-bde3-405cfaff5421',
  title: 'Components/Segmented button',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2864-83396&node-type=instance&m=dev',
    },
  },
  args: {
    labelCount: 4,
  },
  argTypes: {
    labelCount: {
      name: 'Number of segments',
      description: `Defines the number of segments for the segmented button. The maximum number of supported segments is 8. If you need more options, please refer to the select component.`,
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
            (label, index) => html`
              <label class="segmented-button-label">
                <input name="${args.name}" type="radio" checked={index === 0} />
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
  args: {
    name: 'another-segmented-button-name',
  },
  render: (args: Args) => {
    const labelCount = Math.min(args.labelCount || 0, MAX_LABELS);

    return html`
      <div class="segmented-button-container">
        <fieldset class="segmented-button">
          <legend>Choose one of the options</legend>
          ${Array.from({ length: labelCount }, (_undefined, index) => html`
            <label class="segmented-button-label">
              <input name="${args.name}" type="radio" checked={ index === 0 } />
              <post-icon name={`${1000 + index}`} />
            </label>
          `)}
        </fieldset>
      </div>
    `;
  },
};
