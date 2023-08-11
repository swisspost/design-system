import type { Args, Meta } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { BADGE } from '../../../../.storybook/constants';
import { nothing } from 'lit';
import { useArgs } from '@storybook/preview-api';

export const choiceCardMeta: Meta = {
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
    controls: {
      exclude: ['Type'],
    },
  },
  args: {
    label: 'Card check text',
    type: 'radio',
    checked: false,
    disabled: false,
    focused: false,
    validation: 'null',
    showDescription: false,
    description: 'A small description',
    icon: 1000,
    showIcon: false,
  },
  argTypes: {
    label: {
      name: 'Label',
      type: 'string',
      description: 'The main label of the input',
      table: {
        category: 'General',
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'radio',
        labels: {
          radio: 'Radio button',
          checkbox: 'Checkbox',
        },
      },
      options: ['radio', 'checkbox'],
      table: {
        // Hide it in the controls because there are two pages
        disable: true,
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    focused: {
      name: 'Focused',
      description: 'Render the component in a focused state',
      control: { type: 'boolean' },
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
    showDescription: {
      name: 'Show description',
      type: 'boolean',
      description: 'Toggles an additional description',
      table: {
        category: 'Description',
      },
    },
    description: {
      name: 'Description',
      type: 'string',
      description: 'A short additional description',
      table: {
        category: 'Description',
      },
    },
    showIcon: {
      name: 'Show icon',
      type: 'boolean',
      description: 'Show or hide icon',
      table: {
        category: 'Icon',
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
      },
      options: [1000, 1001, 2000],
      table: {
        category: 'Icon',
      },
    },
  },
};

export const choiceCardDefault = (args: Args) => {
  const [_, updateArgs] = useArgs();

  // Conditional classes
  const inputClasses = classMap({
    'form-check-input': true,
    'is-invalid': args.validation === 'is-invalid',
  });
  const cardClassMap = classMap({
    'disabled': args.disabled,
    'is-invalid': args.validation === 'is-invalid',
    'checkbox-button-card': args.type === 'checkbox',
    'radio-button-card': args.type === 'radio',
  });

  // Child components
  const id = `control-${crypto.randomUUID().slice(0, 8)}`;
  const description = html`
    <br />
    <span class="font-size-12">${args.description}</span>
  `;
  const icon = html`
    <post-icon name="${args.icon}" aria-hidden="true"></post-icon>
  `;

  // Firefox fallback for the :has selector
  const _handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    updateArgs({ checked: target.checked });

    // Fix input events not fired on "deselected" radio buttons
    target
      .closest('fieldset')
      ?.querySelectorAll('.radio-button-card')
      .forEach(e => e?.classList.remove('checked'));
    target.parentElement?.classList.toggle('checked', target.checked);
  };

  // Firefox fallback for the :has selector
  const _handleFocus = (e: InputEvent) => {
    updateArgs({ focused: true });
    (e.target as HTMLInputElement).parentElement?.classList.add('focused');
  };

  // Firefox fallback for the :has selector
  const _handleBlur = (e: InputEvent) => {
    updateArgs({ focused: false });
    (e.target as HTMLInputElement).parentElement?.classList.remove('focused');
  };

  return html`
    <div class=${cardClassMap}>
      <input
        id=${id}
        name="${args.type}-button-card"
        class=${inputClasses}
        type=${args.type}
        ?disabled=${args.disabled}
        .checked=${args.checked}
        ?checked=${args.checked}
        @input=${_handleInput}
        @focus=${_handleFocus}
        @blur=${_handleBlur}
      />
      <label id="label-${id}" class="form-check-label" for="${id}">
        <span>${args.label}</span>
        ${args.showDescription ? description : nothing}
      </label>
      ${args.showIcon ? icon : nothing}
    </div>
  `;
};

export const choiceCardGroup = (args: Args) => {
  const loop = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  const col = (label: string) => html`
    <div class="col-sm-6">
      ${choiceCardDefault({ ...args, label, checked: false, focused: false })}
    </div>
  `;

  const error = html`
    <p id="invalid-checkbox" class="mt-3 invalid-feedback d-block">Invalid choice</p>
  `;

  return html`
    <fieldset class="container-fluid">
      <legend aria-describedby="${args.validation === 'is-invalid' ? 'invalid-checkbox' : nothing}">
        Legend
      </legend>
      <div class="row g-3">${loop.map(n => col(n))}</div>
      ${args.validation === 'is-invalid' ? error : null}
    </fieldset>
  `;
};
