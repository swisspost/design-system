import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '78509712-d45e-462c-bde3-405cfaff5421',
  title: 'Components/Segmented Button',
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
    labels: ['The Good', 'The Bad', 'The Ugly', 'The Great', 'The Great'],
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
      description: 'Defines the labels for each option in the segmented button.',
      control: { type: 'object' },
      table: { category: 'Content' },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderSegmentedButton(args: Args) {
  const labelsArray = args.labels || [];
  return html`
    <div class="segmented-button-container">
      <fieldset class="segmented-button segmented-button-${labelsArray.length}">
        ${labelsArray.map(
          (label, index) => html`
            <input id="${args.name}-${index + 1}" tabindex="-1" name="${args.name}" type="radio" />
            <label for="${args.name}-${index + 1}" tabindex="0">${label}</label>
          `
        )}
      </fieldset>
    </div>
  `;
}

export const Default: Story = {
  args: {
    labels: ['The Good', 'The Bad', 'The Ugly', 'The Great', 'The Great'],
  },
};

export const CustomLabels: Story = {
  args: {
    labels: ['Option A', 'Option B', 'Option C'],
  },
};
