import { MetaComponent } from '@root/types';
import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

const meta: MetaComponent = {
  id: 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e',
  title: 'Components/Date Picker',
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
  },
};
export default meta;

// Setting different instances of the post-date-picker forces the rerender of the component and make sure it updates when args change
function render(args: Args) {
  return html`
    <post-date-picker
      id=${args.id}
      ?range="${args.range}"
      ?inline="${args.inline}"
      min=${args.min || nothing}
      max=${args.max || nothing}
      locale=${args.locale || nothing}
      text-toggle-calendar=${args.textToggleCalendar}
      text-next-decade=${args.textNextDecade}
      text-next-month=${args.textNextMonth}
      text-next-year=${args.textNextYear}
      text-previous-decade=${args.textPreviousDecade}
      text-previous-month=${args.textPreviousMonth}
      text-previous-year=${args.textPreviousYear}
      text-switch-year=${args.textSwitchYear}
    >
      <input class=${args.inline ? nothing : 'form-control'} value=${args.value ?? nothing} />
    </post-date-picker>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

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
            dp.cellConfig = ({ date, cellType }) => {
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
