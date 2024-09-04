import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

// TODO: discuss documentation v2
// TODO: discuss MetaComponent type errors
const meta: MetaComponent = {
  id: '77cbd9b3-dc27-4c2f-b6bc-a706c1b4d0e5',
  title: 'Components/Forms/Text Input',
  render: renderTextInput,
};

export default meta;

type Story = StoryObj;

function renderTextInput() {
  return html`
    <div class="text-input mb-regular">
      <input type="text" placeholder=" " id="text-input" />
      <label for="text-input">Label</label>
    </div>

    <div class="text-input mb-regular">
      <input type="text" placeholder=" " value="Value" id="text-input-value" />
      <label for="text-input-value">Label</label>
    </div>

    <div class="text-input mb-regular">
      <input type="text" placeholder=" " id="text-input-disabled" disabled />
      <label for="text-input-disabled">Label</label>
    </div>

    <div class="text-input mb-regular">
      <input type="text" placeholder=" " value="Value" id="text-input-disabled-value" disabled />
      <label for="text-input-disabled-value">Label</label>
    </div>
  `;
}

export const Default: Story = {};
