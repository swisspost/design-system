import { StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '13fb5dfe-6c96-4246-aa6a-6df9569f143f',
  title: 'Guidelines/Form Labels',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const FieldsetDontExample: Story = {
  render: () => html`
    <fieldset>
      <legend>Gender</legend>
      <input type="radio" name="gender" value="male" /> Male
      <input type="radio" name="gender" value="female" /> Female
    </fieldset>
  `,
};

export const FieldsetDoExample: Story = {
  render: () => html`
    <fieldset>
      <legend>Please select your gender:</legend>
      <div class="form-check">
        <input type="radio" id="male" name="gender-do" value="male" />
        <label for="male">Male</label>
      </div>
      <div class="form-check">
        <input type="radio" id="female" name="gender-do" value="female" />
        <label for="female">Female</label>
      </div>
    </fieldset>
  `,
};
