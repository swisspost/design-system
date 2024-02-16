import { useArgs } from '@storybook/preview-api';
import { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { parse } from '../../../utils/sass-export';
import scss from './card-control.module.scss';

// TODO: fieldset and legend example

const SCSS_VARIABLES = parse(scss);

const meta: Meta = {
  id: '886fabcf-148b-4054-a2ec-4869668294fb',
  title: 'Components/Forms/Card-Control',
  component: 'post-card-control',
  parameters: {
    badges: [BADGE.NEEDS_REVISION, BADGE.SINCE_V1],
  },
  args: {
    label: 'Label',
    description: '',
    type: 'checkbox',
    name: '',
    value: '',
    checked: '',
    disabled: '',
    validity: 'null',
    icon: '',
    slotIcon: '',
    slotInvalidFeedback: '',
  },
  argTypes: {
    type: {
      control: {
        type: 'radio',
        labels: {
          checkbox: 'Checkbox',
          radio: 'Radio',
        },
      },
      options: ['checkbox', 'radio'],
    },
    validity: {
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          true: 'Valid',
          false: 'Invalid',
        },
      },
      options: ['null', 'true', 'false'],
      table: {
        type: {
          summary: 'null | boolean',
        },
      },
    },
    slotIcon: {
      table: {
        disable: true,
      },
    },
    slotInvalidFeedback: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const [, updateArgs] = useArgs();

    const icon = html`<span slot="icon">${unsafeHTML(args.slotIcon)}</span> `;
    const invalidFeedback = html`<span slot="invalid-feedback">
      ${unsafeHTML(args.slotInvalidFeedback)}
    </span>`;

    return html`
      <post-card-control
        label="${args.label}"
        description="${args.description || nothing}"
        type="${args.type || nothing}"
        name="${args.name || nothing}"
        value="${args.value || nothing}"
        checked="${args.checked || nothing}"
        disabled="${args.disabled || nothing}"
        validity="${args.validity !== 'null' ? args.validity : nothing}"
        icon="${args.icon || nothing}"
        @input="${(e: any) => updateArgs({ checked: e.detail.state })}"
        @change="${(e: any) => updateArgs({ checked: e.detail.state })}"
      >
        ${args.slotIcon ? icon : null} ${args.slotInvalidFeedback ? invalidFeedback : null}
      </post-card-control>
    `;
  },
};

export const DarkBackground: Story = {
  parameters: {
    docs: {
      controls: {
        include: ['Background-Color', 'type', 'checked', 'disabled', 'validity'],
      },
    },
  },
  decorators: [
    (story, context) =>
      html`<div
        class="bg-${context.args.background}"
        style="margin: -40px -30px; padding: 40px 30px;"
      >
        ${story()}
      </div>`,
  ],
  args: {
    background: 'dark',
    icon: '1001',
  },
  argTypes: {
    background: {
      name: 'Background-Color',
      description: 'The background color of a surrounding wrapper element.',
      control: {
        type: 'select',
      },
      options: [...Object.keys(SCSS_VARIABLES.dark)],
    },
  },
  render: Default.render,
};

export const CustomIcon: Story = {
  args: {
    slotIcon:
      '<svg viewBox="-31.5 0 319 319" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><defs><path id="path" d="M9.87245893,293.324145 L0.0114611411,30.5732167 C-0.314208957,21.8955842 6.33948896,14.5413918 15.0063196,13.9997149 L238.494389,0.0317105427 C247.316188,-0.519651867 254.914637,6.18486163 255.466,15.0066607 C255.486773,15.339032 255.497167,15.6719708 255.497167,16.0049907 L255.497167,302.318596 C255.497167,311.157608 248.331732,318.323043 239.492719,318.323043 C239.253266,318.323043 239.013844,318.317669 238.774632,318.306926 L25.1475605,308.712253 C16.8276309,308.338578 10.1847994,301.646603 9.87245893,293.324145 L9.87245893,293.324145 Z"/></defs><mask id="mask" fill="white"><use xlink:href="#path"/></mask><use fill="#FF4785" fill-rule="nonzero" xlink:href="#path"/><path fill="#fff" fill-rule="nonzero" mask="url(#mask)" d="M188.665358,39.126973 L190.191903,2.41148534 L220.883535,0 L222.205755,37.8634126 C222.251771,39.1811466 221.22084,40.2866846 219.903106,40.3327009 C219.338869,40.3524045 218.785907,40.1715096 218.342409,39.8221376 L206.506729,30.4984116 L192.493574,41.1282444 C191.443077,41.9251106 189.945493,41.7195021 189.148627,40.6690048 C188.813185,40.2267976 188.6423,39.6815326 188.665358,39.126973 Z M149.413703,119.980309 C149.413703,126.206975 191.355678,123.222696 196.986019,118.848893 C196.986019,76.4467826 174.234041,54.1651411 132.57133,54.1651411 C90.9086182,54.1651411 67.5656805,76.7934542 67.5656805,110.735941 C67.5656805,169.85244 147.345341,170.983856 147.345341,203.229219 C147.345341,212.280549 142.913138,217.654777 133.162291,217.654777 C120.456641,217.654777 115.433477,211.165914 116.024438,189.103298 C116.024438,184.317101 67.5656805,182.824962 66.0882793,189.103298 C62.3262146,242.56887 95.6363019,257.990394 133.753251,257.990394 C170.688279,257.990394 199.645341,238.303123 199.645341,202.663511 C199.645341,139.304202 118.683759,141.001326 118.683759,109.604526 C118.683759,96.8760922 128.139127,95.178968 133.753251,95.178968 C139.662855,95.178968 150.300143,96.2205679 149.413703,119.980309 Z"/></svg>',
  },
  render: Default.render,
};

export const FormIntegration: Story = {
  parameters: {
    docs: {
      controls: {
        include: ['Fieldset disabled', 'checked', 'disabled'],
      },
    },
  },
  args: {
    fieldsetDisabled: false,
    name: 'card-control',
  },
  argTypes: {
    fieldsetDisabled: {
      name: 'Fieldset disabled',
      description:
        'If a wrapping `fieldset` element is disabled, the `<card-control>` will behave like disabled as well.',
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    story => html`
      ${story()}
      <div class="mt-3">
        <h4>FormData</h4>
        <pre id="AssociatedFormOutput" class="p-2 bg-dark rounded fs-tiny">{}</pre>
      </div>
    `,
  ],
  render: (args: Args, context: StoryContext) => {
    return html` <form id="AssociatedForm" @reset="${formHandler}" @submit="${formHandler}">
      <fieldset .disabled=${args.fieldsetDisabled}>
        <legend>Legend</legend>
        ${Default.render?.(args, context)}
      </fieldset>
      <div class="mt-3 d-flex gap-3 justify-content-end">
        <button type="reset" class="btn btn-link"><post-icon name="2042"></post-icon>Reset</button>
        <button type="submit" class="btn btn-primary btn-animated"><span>Submit</span></button>
      </div>
    </form>`;
  },
};

function formHandler(e: any) {
  if (e.type === 'submit') e.preventDefault();

  setTimeout(() => {
    const formOutput = document.querySelector('#AssociatedFormOutput');
    const formData = Array.from(new FormData(e.target).entries()).reduce(
      (acc, [k, v]) => Object.assign(acc, { [k]: v }),
      {},
    );

    if (formOutput) formOutput.innerHTML = JSON.stringify(formData, null, 2);
  });
}

export const LinedUp: Story = {
  parameters: {
    controls: {
      include: ['Columns'],
    },
  },
  args: {
    colCount: 2,
  },
  argTypes: {
    colCount: {
      name: 'Columns',
      description: 'Controls the amount of elements per row shown in the grid.',
      control: {
        type: 'inline-radio',
      },
      options: [1, 2, 4],
      table: {
        category: 'General',
      },
    },
  },
  render: (args: Args, context: StoryContext) => html`
    <div class="row gy-3">
      ${[1, 2, 3, 4, 5, 6].map(
        i => html`
          <div class="col-${12 / args.colCount}">
            ${Default.render?.(
              {
                label: `Checkbox${i}`,
                description: i === 6 ? '20.- per year' : null,
                type: args.type,
                disabled: i === 3,
                validity: args.validity,
              },
              context,
            )}
          </div>
        `,
      )}
    </div>
  `,
};

export const RadioGroup: Story = {
  render: (args: Args, context: StoryContext) => html`
    <div class="row gy-3">
      ${[1, 2, 3, 4, 5, 6].map(
        i => html`
          <div class="col-12">
            ${Default.render?.(
              {
                label: `Radio${i}`,
                type: 'radio',
                name: 'RadioGroup_Name',
                disabled: i > 3 && i < 6 ? true : null,
                validity: args.validity,
              },
              context,
            )}
          </div>
        `,
      )}
    </div>
  `,
};
