import type { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html, unsafeStatic } from 'lit/static-html.js';
import { BADGE } from '../../../../.storybook/constants';
import { LitElement } from 'lit';
import { ChangeEvent } from 'react';
const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const meta: Meta = {
  title: 'Components/Select',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    label: 'Label',
    floatingLabel: false,
    hiddenLabel: false,
    value: undefined,
    size: 'null',
    options: 5,
    multiple: false,
    multipleSize: 4,
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
    disabled: false,
    validation: 'null',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Describes the content/topic of the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    floatingLabel: {
      name: 'Floating Label',
      description: 'Defines how the components label is rendered.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description:
        'Renders the component with or without a visible label.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/story/foundations-accessibility--page#labels">label accessibility guide</a>.</span>',
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    value: {
      name: 'Value',
      description: 'The value of the component.',
      control: {
        type: 'string',
      },
      table: {
        disable: true,
      },
    },
    size: {
      name: 'Size',
      description: "Sets the size of the component's appearance.",
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      control: {
        type: 'select',
        labels: {
          'form-select-sm': 'Small',
          'form-select-rg': 'Regular',
          'null': 'Medium',
          'form-select-lg': 'Large',
        },
      },
      options: ['form-select-sm', 'form-select-rg', 'null', 'form-select-lg'],
      table: {
        category: 'General',
      },
    },
    options: {
      name: 'Options',
      description: 'Amount of `option` elements to render in the component.',
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
      table: {
        category: 'General',
      },
    },
    multiple: {
      name: 'Multiple',
      description: 'When set, allows multiple options to be selected (multi-select).',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    multipleSize: {
      name: 'Multiple Size',
      description:
        'When set to a number larger than 0, will set the number of display option rows.<div className="text-danger">Note: not all browser will respect this setting.</div>',
      if: {
        arg: 'multiple',
      },
      control: {
        type: 'number',
        min: 0,
        max: 10,
        step: 1,
      },
      table: {
        category: 'General',
      },
    },
    hint: {
      name: 'Helper Text',
      description: 'Text to place in the help text area of the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-mini alert alert-info alert-sm">There are accessibility issues with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description: 'Controls the validation state appearance of the component.',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-valid': 'Valid',
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-valid', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const Template: Story = {
  render: (args: Args, context: StoryContext) => {
    const id = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleSelect`;
    const classes = ['form-select', args.size, args.validation]
      .filter(c => c && c !== 'null')
      .join(' ');
    const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
    const label = !useAriaLabel
      ? html`
          <label key="label" htmlFor="${id}" class="form-label">${args.label}</label>
        `
      : null;
    const optionElements = Array.from({ length: args.options - 1 }, (_, i) => i + 2).map(
      (key: number) => html`
        <option key=${key} value="valoro_${key}">Opcion ${key}</option>
      `,
    );
    const options = [
      html`
        <option key="default-option">Elektu opcion...</option>
      `,
      ...optionElements,
    ];
    const contextuals = [
      args.validation === 'is-valid'
        ? html`
            <p key="valid" class="valid-feedback">Ggranda sukceso!</p>
          `
        : null,
      args.validation === 'is-invalid'
        ? html`
            <p key="invalid" class="invalid-feedback">Eraro okazis!</p>
          `
        : null,
      args.hint !== ''
        ? html`
            <div key="hint" class="form-text">${args.hint}</div>
          `
        : null,
    ];
    const control = html`
      <select
        key="control"
        .id=${id}
        class=${classes}
        defaultValue=${args.value}
        ?multiple=${args.multiple}
        size=${args.multipleSize}
        ?disabled=${args.disabled}
        aria-label=${useAriaLabel ? args.label : undefined}
        aria-invalid=${VALIDATION_STATE_MAP[args.validation]}
        @Change=${(e: ChangeEvent<HTMLSelectElement>) => {
          //updateArgs({ value: e.target.value });

          if (document.activeElement === e.target) {
            setTimeout(() => {
              const element: HTMLSelectElement | null = document.querySelector(`#${id}`);
              if (element) element.focus();
            }, 25);
          }
        }}
      >
        ${options}
      </select>
    `;

    if (args.floatingLabel) {
      return html`
        <div className="form-floating">
          ${[control, label, ...contextuals].filter(el => el !== null)}
        </div>
      `;
    } else {
      return html`
        ${[label, control, ...contextuals].filter(el => el !== null)}
      `;
    }
  },
};

export const Default: Story = {
  ...Template,
};

/*
import React from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './select.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';



const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();
  const id = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleSelect`;
  const classes = ['form-select', args.size, args.validation]
    .filter(c => c && c !== 'null')
    .join(' ');

  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label: JSX.Element | null = !useAriaLabel ? (
    <label key="label" htmlFor={id} className="form-label">
      {args.label}
    </label>
  ) : null;

  const optionElements: JSX.Element[] = Array.from(
    { length: args.options - 1 },
    (_, i) => i + 2,
  ).map((key: number) => (
    <option key={key} value={`valoro_${key}`}>
      Opcion {key}
    </option>
  ));
  const options: JSX.Element[] = [
    <option key="default-option">Elektu opcion...</option>,
    ...optionElements,
  ];

  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? (
      <p key="valid" className="valid-feedback">
        Ggranda sukceso!
      </p>
    ) : null,
    args.validation === 'is-invalid' ? (
      <p key="invalid" className="invalid-feedback">
        Eraro okazis!
      </p>
    ) : null,
    args.hint !== '' ? (
      <div key="hint" className="form-text">
        {args.hint}
      </div>
    ) : null,
  ];

  const control: JSX.Element = (
    <select
      key="control"
      id={id}
      className={classes}
      defaultValue={args.value}
      multiple={args.multiple}
      size={args.multipleSize}
      disabled={args.disabled}
      aria-label={useAriaLabel ? args.label : undefined}
      aria-invalid={VALIDATION_STATE_MAP[args.validation]}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        updateArgs({ value: e.target.value });

        if (document.activeElement === e.target) {
          setTimeout(() => {
            const element: HTMLSelectElement | null = document.querySelector(`#${id}`);
            if (element) element.focus();
          }, 25);
        }
      }}
    >
      {options}
    </select>
  );

  if (args.floatingLabel) {
    return (
      <div className="form-floating">
        {[control, label, ...contextuals].filter(el => el !== null)}
      </div>
    );
  } else {
    return <>{[label, control, ...contextuals].filter(el => el !== null)}</>;
  }
};

export const Default: Story = Template.bind({});

export const FloatingLabel: Story = Template.bind({});
FloatingLabel.parameters = {
  controls: {
    exclude: [
      'Hidden Label',
      'Options',
      'Multiple',
      'Size',
      'Helper Text',
      'Disabled',
      'Validation',
    ],
  },
};
FloatingLabel.args = {
  floatingLabel: true,
  hint: '',
};

export const Size: Story = Template.bind({});
Size.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Hidden Label',
      'Options',
      'Multiple',
      'Helper Text',
      'Disabled',
      'Validation',
    ],
  },
};
Size.args = {
  size: 'form-select-sm',
  hint: '',
};

export const Validation: Story = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Hidden Label',
      'Options',
      'Size',
      'Multiple',
      'Helper Text',
      'Disabled',
    ],
  },
};
Validation.args = {
  validation: 'is-invalid',
  hint: '',
};
*/
