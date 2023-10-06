import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Card-Control',
  component: 'post-card-control',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html`
    <post-card-control input-d="CardControl_1">
      <span slot="label">Label</span>
      <span slot="description">Description</span>

      <div>
        <select id="docs_Default_ExampleSelect_1" class="form-select" aria-label="" aria-invalid="">
          <option>Elektu opcion...</option>
          <option value="valoro_2">Opcion 2</option>
          <option value="valoro_3">Opcion 3</option>
          <option value="valoro_4">Opcion 4</option>
          <option value="valoro_5">Opcion 5</option>
        </select>
      </div>
    </post-card-control>
    <hr />
    <post-card-control type="radio" inputId="CardControl_2">
      <span slot="label">Label</span>
      <span slot="description">Description</span>

      <div>
        <select id="docs_Default_ExampleSelect_2" class="form-select" aria-label="" aria-invalid="">
          <option>Elektu opcion...</option>
          <option value="valoro_2">Opcion 2</option>
          <option value="valoro_3">Opcion 3</option>
          <option value="valoro_4">Opcion 4</option>
          <option value="valoro_5">Opcion 5</option>
        </select>
      </div>
    </post-card-control>
  `,
};
