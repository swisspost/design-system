import { useArgs } from '@storybook/preview-api';
import { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { parse } from '../../../utils/sass-export';
import './card-control.styles.scss';
import scss from './card-control.module.scss';

const SCSS_VARIABLES = parse(scss);

const meta: Meta = {
  id: '886fabcf-148b-4054-a2ec-4869668294fb',
  title: 'Components/Forms/Card-Control',
  component: 'post-card-control',
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
        class="${args.class || nothing}"
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
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="-31.5 0 319 319"><defs><path id="a" d="M9.872 293.324.012 30.574C-.315 21.895 6.338 14.54 15.005 14L238.494.032c8.822-.552 16.42 6.153 16.972 14.975.02.332.031.665.031.998v286.314c0 8.839-7.165 16.004-16.004 16.004-.24 0-.48-.005-.718-.016l-213.627-9.595c-8.32-.373-14.963-7.065-15.276-15.388Z"/></defs><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><use xlink:href="#a" fill="#FF4785"/><path fill="#fff" d="m188.665 39.127 1.527-36.716L220.884 0l1.322 37.863a2.387 2.387 0 0 1-3.864 1.96l-11.835-9.325-14.013 10.63a2.387 2.387 0 0 1-3.829-2.001Zm-39.251 80.853c0 6.227 41.942 3.243 47.572-1.131 0-42.402-22.752-64.684-64.415-64.684-41.662 0-65.005 22.628-65.005 56.57 0 59.117 79.78 60.249 79.78 92.494 0 9.052-4.433 14.426-14.184 14.426-12.705 0-17.729-6.49-17.138-28.552 0-4.786-48.458-6.278-49.936 0-3.762 53.466 29.548 68.887 67.665 68.887 36.935 0 65.892-19.687 65.892-55.326 0-63.36-80.961-61.663-80.961-93.06 0-12.728 9.455-14.425 15.07-14.425 5.909 0 16.546 1.042 15.66 24.801Z" mask="url(#b)"/></svg>',
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
      include: ['Columns', 'Full Height'],
    },
  },
  args: {
    colCount: 2,
    fullHeight: false,
  },
  argTypes: {
    colCount: {
      name: 'Columns',
      description: 'Controls the amount of elements per row shown in the grid.',
      control: {
        type: 'inline-radio',
      },
      options: [1, 2, 3, 4],
      table: {
        category: 'General',
      },
    },
    fullHeight: {
      name: 'Full Height',
      description: 'Stretch elements in one row to the maximum height.',
      control: {
        type: 'boolean',
      },
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
                class: args.fullHeight ? 'h-100' : null,
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
    <fieldset>
      <legend>Legend</legend>
      ${[1, 2, 3, 4, 5, 6].map(
        i => html`
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
        `,
      )}
    </fieldset>
  `,
};
