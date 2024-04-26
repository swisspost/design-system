import type { Args, StoryContext, StoryFn } from '@storybook/web-components';
import { useArgs, useState } from '@storybook/preview-api';
import { nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { MetaComponent } from '../../../../../../types';
import { parse } from '../../../../../utils/sass-export';
import scss from '../card-control.module.scss';

const SCSS_VARIABLES: { [key: string]: string } = parse(scss);

const meta: MetaComponent = {
  id: '047501dd-a185-4835-be91-09130fa3dad9',
  title: 'Components/Forms/Card-Control',
  tags: ['package:HTML'],
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
    groupValidation: 'null',
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
      options: ['none', '1000', '1001', '2000'],
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description: "Controls the display of the component's validation state.",
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
      name: 'Group Validation',
      description: 'Set validation status for the whole group of choice cards',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-invalid'],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

let cardControlId = 0;
const CONTROL_LABELS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

// Firefox fallback for the :has selector
function inputHandler(e: InputEvent, updateArgs: Function) {
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
    const cardClasses = classMap({
      'checked': args.checked,
      'disabled': args.disabled,
      'is-invalid': args.validation === 'is-invalid',
      'checkbox-button-card': args.type === 'checkbox',
      'radio-button-card': args.type === 'radio',
    });
    const inputClasses = classMap({
      'form-check-input': true,
      'is-invalid': args.validation === 'is-invalid',
    });

    // Child components
    const controlId = `CardControl_${id}`;
    const description = html`<span class="font-size-12">${args.description}</span>`;
    const icon = html` <post-icon name="${args.icon}" aria-hidden="true"></post-icon> `;

    return html`
      <div class="${cardClasses}">
        <input
          id="${controlId}"
          name="${args.type}-button-card-${args.inputName ?? `control_${id}`}"
          class="${inputClasses}"
          type="${args.type}"
          ?disabled="${args.disabled}"
          .checked="${args.checked}"
          checked="${args.checked || nothing}"
          @input="${(e: InputEvent) => inputHandler(e, updateArgs)}"
        />
        <label class="form-check-label" for="${controlId}">
          <span>${args.label}</span>
          ${args.description ? description : nothing}
        </label>
        ${args.icon !== 'none' ? icon : nothing}
      </div>
    `;
  },
};

export const DarkBackground = {
  parameters: {
    docs: {
      controls: {
        include: ['Background-Color', 'Type', 'Checked', 'Disabled', 'Validation'],
      },
    },
  },
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html`<div
        class="bg-${context.args.background}"
        style="margin: -40px -30px; padding: 40px 30px;"
      >
        ${story(context.args, context)}
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

function col(label: string, args: Args, useState: Function) {
  const [id] = useState(cardControlId++);

  return html`
    <div class="col-sm-6">
      ${Default.render({
        ...args,
        id,
        label,
        inputName: args.type === 'radio' ? 'group' : `control-${id}`,
        checked: false,
        validation: args.groupValidation,
      })}
    </div>
  `;
}

export const Group = {
  parameters: {
    controls: {
      include: ['Type', 'Group Validation'],
    },
  },
  render: (args: Args) => {
    const error = html`
      <p id="radio-group-invalid-feedback" class="d-block mt-3 invalid-feedback">Invalid choice</p>
    `;

    return html`
      <fieldset class="container-fluid">
        <legend aria-describedby="radio-group-invalid-feedback">Legend</legend>
        <div class="row g-3">${CONTROL_LABELS.map(n => col(n, args, useState))}</div>
        ${args.groupValidation === 'is-invalid' ? error : null}
      </fieldset>
    `;
  },
};
