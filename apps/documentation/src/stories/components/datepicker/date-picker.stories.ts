import { MetaComponent } from '@root/types';
import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { getLabelText, VALIDATION_STATE_MAP, getValidationMessages } from '@/utils/form-elements';

const meta: MetaComponent = {
  id: 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e',
  title: 'Components/Form Date Picker',
  component: 'post-date-picker',
  tags: ['package:WebComponents'],
  render,
  parameters: {
    controls: {
      exclude: ['id'],
    },
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=32786-277036',
    },
  },
  args: {
    id: 'main',
    inline: false,
    range: false,
    min: '',
    max: '',
    locale: '',
    textToggleCalendar: 'Open calendar',
    textNextDecade: 'Next decade',
    textNextMonth: 'Next month',
    textNextYear: 'Next year',
    textPreviousDecade: 'Previous decade',
    textPreviousMonth: 'Previous month',
    textPreviousYear: 'Previous year',
    textSwitchYear: 'Switch to year view',
    label: 'Date',
    floatingLabel: true,
    validation: 'null',
    requiredOptional: 'null',
    hint: 'This is a helpful text that provides guidance or additional information to assist the user in filling out this field correctly.',
  },
  argTypes: {
    locale: {
      control: 'select',
      options: [
        // Common locales for Swiss Post projects
        'en',
        'en-GB',
        'de',
        'de-CH',
        'fr',
        'fr-CH',
        'it',
        'it-CH',
        // Others supported by the air-datepicker
        'ar',
        'bg',
        'ca',
        'cs',
        'da',
        'el',
        'es',
        'eu',
        'fi',
        'hr',
        'hu',
        'id',
        'ja',
        'ko',
        'nb',
        'nl',
        'pl',
        'pt',
        'ro',
        'ru',
        'si',
        'sk',
        'sl',
        'sv',
        'th',
        'tr',
        'uk',
        'zh',
      ],
    },
    min: {
      control: 'text',
    },
    max: {
      control: 'text',
    },
    cellConfig: {
      control: false,
    },
    value: {
      name: 'Value',
      description: 'The date or date range used as a value for the input.',
      type: {
        name: 'string',
      },
      table: {
        category: 'Input',
      },
    },
    floatingLabel: {
      name: 'Floating Label',
      description: 'If true, the label floats over the input field.',
      type: {
        name: 'boolean',
      },
      table: {
        category: 'Input',
      },
    },

    label: {
      name: 'Label',
      description: 'A caption for the date picker.',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Input',
      },
    },
    validation: {
      name: 'Validation',
      description:
        'Defines the validation state of the input and controls the display of the corresponding return message. <post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#input">validation guidelines here</a>.</p></post-banner> ',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-valid': 'Valid',
          'is-invalid': 'Invalid',
        },
      },
      if: {
        arg: 'disabled',
        truthy: false,
      },
      options: ['null', 'is-valid', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
    requiredOptional: {
      name: 'Required / Optional',
      description: 'Whether the field is required or optional.',
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          required: 'Required',
          optional: 'Optional',
        },
      },
      options: ['null', 'required', 'optional'],
      table: {
        category: 'States',
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
  },
};
export default meta;

function getLocaleDir(locale: string): 'rtl' | 'ltr' {
  return new Date()
    .toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    .includes('\u200F')
    ? 'rtl'
    : 'ltr';
}

const isoStringPattern = /^\d{4}-\d{2}-\d{2}$/;

// Setting different instances of the post-date-picker forces the rerender of the component and make sure it updates when args change
function render(args: Args, context: StoryContext) {
  const validationMessages = getValidationMessages(args, context, !args.inline);

  const validation = args.validation && args.validation !== 'null' ? ` ${args.validation}` : '';

  const ariaDescribedByParts = [
    args.hint ? `form-hint-${context.id}` : '',
    args.validation !== 'null' ? `${args.validation}-id-${context.id}` : '',
  ].filter(Boolean);

  const ariaDescribedBy = ariaDescribedByParts.join(' ') || nothing;

  const input = html`<input
    id="${args.id}-input"
    type=${args.inline ? 'hidden' : 'text'}
    class=${args.inline ? nothing : `form-control${validation}`}
    value=${args.value ?? nothing}
    aria-describedby=${args.inline ? nothing : ariaDescribedBy}
    ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
    ?required="${args.requiredOptional === 'required'}"
  />`;

  const label = html`<label class="form-label" for="${args.id}-input"
    >${getLabelText(args)}</label
  >`;

  return html`${keyed(
    `${args.id}-${args.inline}-${args.floatingLabel}-${args.validation}`,
    html` ${args.floatingLabel ? nothing : label}
      <post-date-picker
        id=${args.id}
        class=${args.floatingLabel && !args.inline ? 'form-floating' : ''}
        ?range="${args.range}"
        ?inline="${args.inline}"
        min=${isoStringPattern.test(args.min) ? args.min : nothing}
        max=${isoStringPattern.test(args.max) ? args.max : nothing}
        locale=${args.locale || nothing}
        text-toggle-calendar=${args.textToggleCalendar}
        text-next-decade=${args.textNextDecade}
        text-next-month=${args.textNextMonth}
        text-next-year=${args.textNextYear}
        text-previous-decade=${args.textPreviousDecade}
        text-previous-month=${args.textPreviousMonth}
        text-previous-year=${args.textPreviousYear}
        text-switch-year=${args.textSwitchYear}
        >${args.floatingLabel && !args.inline
          ? html`${input} ${label}`
          : html`${input}`}</post-date-picker
      >
      ${validationMessages}`,
  )}`;
}

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const locale = typeof context.args.locale === 'string' ? context.args.locale : '';
      const dir = locale ? getLocaleDir(locale) : nothing;
      return html`<div dir=${dir}>${story(context.args, context)}</div> `;
    },
  ],
};

// For testing purposes
export const Inline: Story = {
  args: {
    inline: true,
    id: 'inline',
  },
};

export const InlineRange: Story = {
  args: {
    inline: true,
    range: true,
    id: 'inline-range',
  },
};

export const Range: Story = {
  args: {
    inline: false,
    range: true,
    id: 'range',
  },
};

export const DisabledDates: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return html`${story(context.args, context)}
        <script>
          window.addEventListener('DOMContentLoaded', () => {
            const dp = document.querySelector('post-date-picker#disabled-dates');
            dp.cellConfig = (date, cellType) => {
              if (cellType === 'day' && date.getDay() === 0) {
                return { disabled: true, classes: 'is-sunday' };
              }
            };
          });
        </script>`;
    },
  ],
  args: {
    inline: true,
    range: false,
    id: 'disabled-dates',
  },
};
