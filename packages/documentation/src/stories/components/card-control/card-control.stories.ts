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
    <!-- Default -->
    <!--
    <div class="row row-cols-2 mb-3">
      <div class="col">
        <post-card-control
          control-id="CardControl_1_1"
          label="Default"
          description="Description"
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_1_2"
          label="Default selected"
          description="Description"
          checked
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
    </div>

    <!-- Error --

    <div class="row row-cols-2 mb-3">
      <div class="col">
        <post-card-control
          control-id="CardControl_2_1"
          label="Error"
          description="Description"
          state="false"
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_2_2"
          label="Error selected"
          description="Description"
          checked
          state="false"
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
    </div>

    <!-- Disabled --

    <div class="row row-cols-2 mb-3">
      <div class="col">
        <post-card-control
          control-id="CardControl_3_1"
          label="Disabled"
          description="Description"
          disabled
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_3_2"
          label="Disabled selected"
          description="Description"
          checked
          disabled
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
    </div>

    -->

    <!-- Default radio -->

    <div class="row row-cols-2 mb-3" role="radiogroup">
      <div class="col">
        <post-card-control
          control-id="CardControl_4_1"
          label="Default"
          description="Description"
          type="radio"
          name="CardControl_4"
          icon="1000"
          checked
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_4_2"
          label="Default selected"
          description="Description"
          type="radio"
          name="CardControl_4"
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
    </div>

    <!-- Error radio -->

    <div class="row row-cols-2 mb-3" role="radiogroup">
      <div class="col">
        <post-card-control
          control-id="CardControl_5_1"
          label="Error"
          description="Description"
          type="radio"
          name="CardControl_5"
          state="false"
          icon="1000"
          checked
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_5_2"
          label="Error selected"
          description="Description"
          type="radio"
          name="CardControl_5"
          state="false"
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
    </div>

    <!-- Disabled radio -->

    <div class="row row-cols-2 mb-3" role="radiogroup">
      <div class="col">
        <post-card-control
          control-id="CardControl_6_1"
          label="Disabled"
          description="Description"
          type="radio"
          name="CardControl_6"
          disabled
          icon="1000"
          checked
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_6_2"
          label="Disabled selected"
          description="Description"
          type="radio"
          name="CardControl_6"
          disabled
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
    </div>

    <!-- Radio Group -->

    <div class="row row-cols-3 mb-3" role="radiogroup">
      <div class="col">
        <post-card-control
          control-id="CardControl_7_1"
          label="Group 7"
          description="Description"
          type="radio"
          name="CardControl_7"
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_7_2"
          label="Group 7"
          description="Description"
          type="radio"
          name="CardControl_7"
          icon="1000"
          disabled
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
      <div class="col">
        <post-card-control
          control-id="CardControl_7_3"
          label="Group 7"
          description="Description"
          type="radio"
          name="CardControl_7"
          icon="1000"
        >
          <div>
            <select class="form-select">
              <option>Elektu opcion...</option>
              <option value="valoro_2">Opcion 2</option>
            </select>
          </div>
        </post-card-control>
      </div>
    </div>
  `,
};
