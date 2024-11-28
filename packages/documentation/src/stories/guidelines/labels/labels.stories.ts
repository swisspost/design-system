import { StoryObj } from '@storybook/web-components';
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
  render: () => html`<fieldset>
    <div>
      <legend>Gender</legend>
      <input type="radio" name="gender" value="male" /> Male
      <input type="radio" name="gender" value="female" /> Female
    </div>
  </fieldset>`,
};

export const FieldsetDoExample: Story = {
  render: () => html`<span id="group-description">Please select your gender:</span>
    <fieldset>
      <legend>Gender</legend>
      <input type="radio" name="gender" value="male" /> Male
      <input type="radio" name="gender" value="female" /> Female
    </fieldset>`,
};

export const DivForGroupingExample: Story = {
  render: () => html`<span id="group-description">Please select your gender:</span>
    <div role="group" aria-labelledby="group-label " aria-describedby="group-description">
      <span id="group-label" style="margin-right:5px">Gender </span>
      <input type="radio" name="gender" value="male" /> Male
      <input type="radio" name="gender" value="female" /> Female
    </div>`,
};
