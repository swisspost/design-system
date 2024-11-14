import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

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
    name: 'five',
    labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
    selected: 0, // Default selection for ease of testing
  },
  argTypes: {
    name: {
      name: 'Name',
      description: 'Sets the name attribute for the segmented button component.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    labels: {
      name: 'Labels',
      description: 'Defines the labels for each option in the segmented button. Maximum of 10 options allowed.',
      control: { type: 'object' },
      table: { category: 'Content' },
      validation: { maxLength: 10 },
    },
    selected: {
      name: 'Selected',
      description: 'Specifies the index of the default selected option.',
      control: { type: 'number', min: 0, max: 9 },
      table: { category: 'State' },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderSegmentedButton(args: Args) {
  const labelsArray = args.labels || [];
  const selectedIndex = args.selected || 0;

  return html`
    <div class="segmented-button-container">
      <fieldset class="segmented-button segmented-button-${labelsArray.length}">
        ${labelsArray.slice(0, 10).map(
          (label, index) => html`
            <input id="${args.name}-${index + 1}" 
              tabindex="-1" 
              name="${args.name}" 
              type="radio" 
              ?checked="${index === selectedIndex}" />
            <label for="${args.name}-${index + 1}" tabindex="0">${label}</label>
          `
        )}
      </fieldset>
    </div>
  `;
}

export const Default: Story = {
  args: {
    labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
    selected: 0,
  },
};
