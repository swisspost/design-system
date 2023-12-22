import { useArgs } from '@storybook/preview-api';
import { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { PostCardControlCustomEvent } from '@swisspost/design-system-components';

const meta: Meta = {
  title: 'Components/Forms/Card-Control',
  component: 'post-card-control',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    label: 'Label',
    description: '',
    controlId: 'Default_CardControl',
    type: 'checkbox',
    name: '',
    value: '',
    checked: '',
    disabled: '',
    state: 'null',
    icon: '',
    slotDefault: '',
    slotIcon: '',
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
    state: {
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          true: 'Valid',
          false: 'Invalid',
        },
      },
      options: ['null', 'true', 'false'],
    },
    slotDefault: {
      name: 'default',
      description:
        'Content to place in the default slot. <div className="alert alert-sm alert-info">Content only gets rendered if the control is checked and is not disabled.</div><p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Block-level_content" target="_blank">block content</a>.<br>This means, you can put everything in it, as long as there is enough space to render it.</p>',
      table: {
        category: 'Slots',
        type: {
          summary: null,
        },
      },
    },
    slotIcon: {
      name: 'icon',
      description:
        'Content to place in the named `icon` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content" target="_blank">inline content</a>.<br>It is only meant for <code>img</code> or <code>svg</code> elements.</p>',
      table: {
        category: 'Slots',
        type: {
          summary: 'html',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const [, updateArgs] = useArgs();

    return html`
      <post-card-control
        label="${args.label}"
        description="${args.description || nothing}"
        control-id="${args.controlId}"
        type="${args.type || nothing}"
        form="${args.form || nothing}"
        name="${args.name || nothing}"
        value="${args.value || nothing}"
        checked="${args.checked || nothing}"
        disabled="${args.disabled || nothing}"
        state="${args.state !== 'null' ? args.state : nothing}"
        icon="${args.icon || nothing}"
        @controlChange="${(e: PostCardControlCustomEvent<boolean>) =>
          updateArgs({ checked: e.detail })}"
      >
        ${unsafeHTML(args.slotDefault)}
        <div slot="icon">${unsafeHTML(args.slotIcon)}</div>
      </post-card-control>
    `;
  },
};

export const CustomIcon: Story = {
  args: {
    controlId: 'CustomIcon_CardControl',
    slotIcon:
      '<svg viewBox="-31.5 0 319 319" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><defs><path id="path" d="M9.87245893,293.324145 L0.0114611411,30.5732167 C-0.314208957,21.8955842 6.33948896,14.5413918 15.0063196,13.9997149 L238.494389,0.0317105427 C247.316188,-0.519651867 254.914637,6.18486163 255.466,15.0066607 C255.486773,15.339032 255.497167,15.6719708 255.497167,16.0049907 L255.497167,302.318596 C255.497167,311.157608 248.331732,318.323043 239.492719,318.323043 C239.253266,318.323043 239.013844,318.317669 238.774632,318.306926 L25.1475605,308.712253 C16.8276309,308.338578 10.1847994,301.646603 9.87245893,293.324145 L9.87245893,293.324145 Z"/></defs><mask id="mask" fill="white"><use xlink:href="#path"/></mask><use fill="#FF4785" fill-rule="nonzero" xlink:href="#path"/><path fill="#fff" fill-rule="nonzero" mask="url(#mask)" d="M188.665358,39.126973 L190.191903,2.41148534 L220.883535,0 L222.205755,37.8634126 C222.251771,39.1811466 221.22084,40.2866846 219.903106,40.3327009 C219.338869,40.3524045 218.785907,40.1715096 218.342409,39.8221376 L206.506729,30.4984116 L192.493574,41.1282444 C191.443077,41.9251106 189.945493,41.7195021 189.148627,40.6690048 C188.813185,40.2267976 188.6423,39.6815326 188.665358,39.126973 Z M149.413703,119.980309 C149.413703,126.206975 191.355678,123.222696 196.986019,118.848893 C196.986019,76.4467826 174.234041,54.1651411 132.57133,54.1651411 C90.9086182,54.1651411 67.5656805,76.7934542 67.5656805,110.735941 C67.5656805,169.85244 147.345341,170.983856 147.345341,203.229219 C147.345341,212.280549 142.913138,217.654777 133.162291,217.654777 C120.456641,217.654777 115.433477,211.165914 116.024438,189.103298 C116.024438,184.317101 67.5656805,182.824962 66.0882793,189.103298 C62.3262146,242.56887 95.6363019,257.990394 133.753251,257.990394 C170.688279,257.990394 199.645341,238.303123 199.645341,202.663511 C199.645341,139.304202 118.683759,141.001326 118.683759,109.604526 C118.683759,96.8760922 128.139127,95.178968 133.753251,95.178968 C139.662855,95.178968 150.300143,96.2205679 149.413703,119.980309 Z"/></svg>',
  },
  render: Default.render,
};

export const Content: Story = {
  args: {
    slotDefault: `<p>Textus additione velit esse molestie consequat, vel
      illum dolore eu feugiat nulla.</p>
      <ul>
        <li>Listus mixtus volare pagare la mare.</li>
        <li>Elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat.</li>
      </ul>

      <div class="form-floating">
        <select id="Content_Select" class="form-select">
          <option>Elektu opcion...</option>
          <option value="valoro_1">Opcion 2</option>
          <option value="valoro_2">Opcion 3</option>
        </select>

        <label class="form-label" for="Content_Select">Label</label>

        <div class="form-text">
          Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
          illum dolore eu feugiat nulla facilisis.
        </div>
      </div>

      <div class="form-check mt-3">
        <input id="Content_Radio" type="checkbox" class="form-check-input" />
        <label class="form-check-label" for="Content_Radio">Logas ce la sama adreso</label>
      </div>`,
    controlId: 'Content_CardControl',
    checked: true,
  },
  render: Default.render,
};

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
                controlId: `LindedUp_CardControl_${i}`,
                type: args.type,
                disabled: i === 3,
                state: args.state,
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
                controlId: `RadioGroup_CardControl_${i}`,
                type: 'radio',
                name: 'RadioGroup_Name',
                disabled: i > 3 && i < 6 ? true : null,
                state: args.state,
              },
              context,
            )}
          </div>
        `,
      )}
    </div>
  `,
};
