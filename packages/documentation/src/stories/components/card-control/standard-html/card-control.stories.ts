import type { Args, StoryObj } from '@storybook/web-components-vite';
import { useArgs, useState } from 'storybook/preview-api';
import { nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@root/types';

type useStateFn = typeof useState;

const meta: MetaComponent = {
  id: '047501dd-a185-4835-be91-09130fa3dad9',
  title: 'Components/Form Card Control',
  tags: ['package:Styles', 'status:InProgress'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=22630-6854&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    type: 'checkbox',
    label: 'Label',
    description: '',
    icon: 'none',
    checked: false,
    disabled: false,
    validation: 'null',
    groupValidation: false,
  },
  argTypes: {
    type: {
      name: 'Type',
      control: {
        type: 'radio',
        labels: {
          checkbox: 'Checkbox',
          radio: 'Radio',
        },
      },
      options: ['checkbox', 'radio'],
      table: {
        category: 'General',
      },
    },
    label: {
      name: 'Label',
      type: 'string',
      description: 'The main label of the input',
      table: {
        category: 'General',
      },
    },
    description: {
      name: 'Description',
      type: 'string',
      description: 'A short additional description',
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
      },
      options: ['none', 'letter', 'letteropen', 'parcel'],
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked',
      type: 'boolean',
      description: 'When set to `true`, places the component in the checked state.',
      table: {
        category: 'States',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description:
        'Defines the validation state of the card control and controls the display of the corresponding return message.<post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs##card-control">validation guidelines here</a>.</p></post-banner> ',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
    groupValidation: {
      name: 'GroupValidation',
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const DefaultNew: Story = {
  args: {
    label: 'Label',
    icon: 'component',
    disabled: false,
  },
  render: (args: Args) => {
    function icon(icon: string) {
      return icon
        ? html`<post-icon class="card-control--icon" name="${icon}" aria-hidden="true"></post-icon>`
        : nothing;
    }

    function description(description: string) {
      return description
        ? html`<span class="card-control--description">${description}</span>`
        : nothing;
    }

    function cardControl(a: Args) {
      return html`<label class="card-control ${a.classes ?? ''}">
        <input type=${a.type} disabled=${a.disabled ? 'disabled' : nothing} />
        <span class="card-control--label">${a.label}</span>
        ${icon(a.icon)} ${description(a.description)}
        <!-- <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul> -->
      </label>`;
    }

    return html`
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <p class="text-center">Light Mode</p>
        </div>
        <div class="col">
          <p class="text-center">Dark Mode</p>
        </div>
      </div>

      ${['default', 'alternate', 'accent', 'brand'].map(
        palette =>
          html`<div class="row g-0">
            <div class="col-2 align-self-center">
              <p style="text-transform: capitalize;">${palette}</p>
            </div>
            <div class="col">
              <fieldset class="palette palette-${palette} p-32">
                ${cardControl(args)}
                ${cardControl({ ...args, description: 'Hover', classes: 'pretend-hover' })}
                ${cardControl({ ...args, description: 'Disabled', disabled: true })}
              </fieldset>
            </div>

            <div class="col" data-color-scheme="dark">
              <fieldset class="palette palette-${palette} p-32">
                ${cardControl(args)}
                ${cardControl({ ...args, description: 'Hover', classes: 'pretend-hover' })}
                ${cardControl({ ...args, description: 'Disabled', disabled: true })}
              </fieldset>
            </div>
          </div>`,
      )}
    `;
  },
};

let cardControlId = 0;
const CONTROL_LABELS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

// Firefox fallback for the :has selector
function inputHandler(e: InputEvent, updateArgs: (newArgs: Partial<Args>) => void) {
  const target = e.target as HTMLInputElement;
  updateArgs({ checked: target.checked });

  // Fix input events not fired on "deselected" radio buttons
  target
    .closest('fieldset')
    ?.querySelectorAll('.radio-button-card')
    .forEach(e => e?.classList.remove('checked'));
  target.parentElement?.classList.toggle('checked', target.checked);
}

export const Default = {
  parameters: {
    controls: {
      exclude: ['Group Validation'],
    },
  },
  render: (args: Args) => {
    const [id] = useState(args.id ?? cardControlId++);
    const [_, updateArgs] = useArgs();

    // Conditional classes
    const cardClasses = mapClasses({
      'checked': args.checked,
      'disabled': args.disabled,
      'is-invalid': args.validation === 'is-invalid',
      'checkbox-button-card': args.type === 'checkbox',
      'radio-button-card': args.type === 'radio',
    });
    const validationClass = args.validation !== 'null' ? `${args.validation}` : undefined;

    // Child components
    const controlId = `CardControl_${id}`;
    const description = html`<span class="fs-11">${args.description}</span>`;
    const icon = html` <post-icon name="${args.icon}" aria-hidden="true"></post-icon> `;
    const invalidFeedback = html`<p
      class="invalid-feedback mt-8"
      id="${args.validation}-id-${controlId}"
    >
      Invalid feedback
    </p>`;

    return html`
      <div class="${cardClasses}">
        <input
          id="${controlId}"
          name="${args.type}-button-card-${args.inputName ?? `control_${id}`}"
          class="${ifDefined(validationClass)}"
          type="${args.type}"
          ?disabled="${args.disabled}"
          .checked="${args.checked}"
          checked="${args.checked || nothing}"
          @input="${(e: InputEvent) => inputHandler(e, updateArgs)}"
          aria-describedby="${args.validation != 'null'
            ? `${args.validation}-id-${controlId}`
            : nothing}"
          aria-invalid="${args.validation != 'null' ? true : nothing}"
        />
        <label for="${controlId}">
          <span>${args.label}</span>
          ${args.description ? description : nothing}
        </label>
        ${args.icon !== 'none' ? icon : nothing}
      </div>
      ${args.validation === 'is-invalid' && !args.GroupValidation ? invalidFeedback : nothing}
    `;
  },
};

export const CustomContent: Story = {
  render: Default.render,
};

function col(label: string, args: Args, useState: useStateFn) {
  const [id] = useState(cardControlId++);

  return html`
    <div class="col-sm-6">
      ${Default.render({
        ...args,
        id,
        label,
        inputName: args.type === 'radio' ? 'group' : `control-${id}`,
        checked: false,
        GroupValidation: true,
        validation: args.validation,
      })}
    </div>
  `;
}

export const Group = {
  parameters: {
    controls: {
      include: ['Type', 'Validation'],
    },
  },
  render: (args: Args) => {
    const invalidFeedback = html`
      <p id="invalid-feedback" class="d-inline-flex mt-16 invalid-feedback">Invalid choice</p>
    `;

    return html`
      <fieldset class="container-fluid">
        <legend aria-describedby="invalid-feedback">Legend</legend>
        <div class="row g-16">${CONTROL_LABELS.map(n => col(n, args, useState))}</div>
        ${args.validation === 'is-invalid' ? invalidFeedback : nothing}
      </fieldset>
    `;
  },
};
