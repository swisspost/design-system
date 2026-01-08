import { Args, StoryObj, StoryContext, StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e',
  title: 'Components/Datepicker',
  component: 'post-datepicker',
  tags: ['package:WebComponents'],
  render,
  exclude: ['id'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=21044-101376&t=FNgdl36MZPMbc1Bs-4',
    },
  },
  args: {
    id: 'main',
    inline: false,
    range: false,
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
    min: {
      control: 'text',
    },
    max: {
      control: 'text',
    },
    selectedStartDate: {
      control: 'text',
    },
    selectedEndDate: {
      control: 'text',
      if: {
        arg: 'range',
      },
    },
    textToggleCalendar: {
      table: {
        category: 'Labels',
      },
    },
    textNextDecade: {
      table: {
        category: 'Labels',
      },
    },
    textNextMonth: {
      table: {
        category: 'Labels',
      },
    },
    textNextYear: {
      table: {
        category: 'Labels',
      },
    },
    textPreviousDecade: {
      table: {
        category: 'Labels',
      },
    },
    textPreviousMonth: {
      table: {
        category: 'Labels',
      },
    },
    textPreviousYear: {
      table: {
        category: 'Labels',
      },
    },
    textSwitchYear: {
      table: {
        category: 'Labels',
      },
    },
  },
};
export default meta;

// Setting different instances of the post-datepicker forces the rerender of the component and make sure it updates when args change
function render(args: Args) {
  if (args.range) {
    return args.inline ? renderInlineRange(args) : renderPopupRange(args);
  } else {
    return args.inline ? renderInlineSimple(args) : renderPopupSimple(args);
  }
}

function renderPopupRange(args: Args) {
  return html`
    <post-datepicker id=${args.id} range="true" ?min="${args.min}" ?max="${args.max}"
    text-toggle-calendar="${args.textToggleCalendar}"
    text-next-decade="${args.textNextDecade}"
    text-next-month="${args.textNextMonth}"
    text-next-year="${args.textNextYear}"
    text-previous-decade="${args.textPreviousDecade}"
    text-previous-month="${args.textPreviousMonth}"
    text-previous-year="${args.textPreviousYear}"
    text-switch-year="${args.textSwitchYear}">
    <input type="date"></input>
    <input type="date"></input>
    </post-datepicker>`;
}

function renderInlineRange(args: Args) {
  return html` <post-datepicker
    id=${args.id}
    inline="true"
    range="true"
    ?min="${args.min}"
    ?max="${args.max}"
    text-toggle-calendar="${args.textToggleCalendar}"
    text-next-decade="${args.textNextDecade}"
    text-next-month="${args.textNextMonth}"
    text-next-year="${args.textNextYear}"
    text-previous-decade="${args.textPreviousDecade}"
    text-previous-month="${args.textPreviousMonth}"
    text-previous-year="${args.textPreviousYear}"
    text-switch-year="${args.textSwitchYear}"
  >
  </post-datepicker>`;
}

function renderPopupSimple(args: Args) {
  return html`
    <post-datepicker id=${args.id} ?min="${args.min}" ?max="${args.max}"
    text-toggle-calendar="${args.textToggleCalendar}"
    text-next-decade="${args.textNextDecade}"
    text-next-month="${args.textNextMonth}"
    text-next-year="${args.textNextYear}"
    text-previous-decade="${args.textPreviousDecade}"
    text-previous-month="${args.textPreviousMonth}"
    text-previous-year="${args.textPreviousYear}"
    text-switch-year="${args.textSwitchYear}">
      <input class="form-control" type="date"></input>
    </post-datepicker>`;
}

function renderInlineSimple(args: Args) {
  return html` <post-datepicker
    id=${args.id}
    inline="true"
    ?min="${args.min}"
    ?max="${args.max}"
    text-toggle-calendar="${args.textToggleCalendar}"
    text-next-decade="${args.textNextDecade}"
    text-next-month="${args.textNextMonth}"
    text-next-year="${args.textNextYear}"
    text-previous-decade="${args.textPreviousDecade}"
    text-previous-month="${args.textPreviousMonth}"
    text-previous-year="${args.textPreviousYear}"
    text-switch-year="${args.textSwitchYear}"
  >
  </post-datepicker>`;
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
            const dp = document.querySelector('post-datepicker#disabled-dates');
            dp.renderCellCallback = ({ date, cellType }) => {
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
