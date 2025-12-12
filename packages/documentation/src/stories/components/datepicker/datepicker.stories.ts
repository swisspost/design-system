import { Args, StoryObj, StoryContext, StoryFn } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
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
    labelToggleCalendar: "Open calendar" ,
    labelNextDecade: "Next decade" ,
    labelNextMonth: "Next month" ,
    labelNextYear: "Next year" ,
    labelPreviousDecade: "Previous decade" ,
    labelPreviousMonth: "Previous month" ,
    labelPreviousYear: "Previous year" ,
    labelSwitchYear: "Switch to year view",
  },
  argTypes: {
    'min': {
      control: 'text'
    },
    'max': {
      control: 'text'
    },
    'selectedStartDate': {
      control: 'text'
    },
    'selectedEndDate': {
      control: 'text',
      if: {
        arg: 'range',
      },
    },
    'labelToggleCalendar': {
      table:{
        category: 'Labels',
      },
    },
    'labelNextDecade': {
      table:{
        category: 'Labels',
      },
    },
    'labelNextMonth': {
      table:{
        category: 'Labels',
      },
    },
    'labelNextYear': {
      table:{
        category: 'Labels',
      },
    },
    'labelPreviousDecade': {
      table:{
        category: 'Labels',
      },
    },
    'labelPreviousMonth': {
      table:{
        category: 'Labels',
      },
    },
    'labelPreviousYear': {
      table:{
        category: 'Labels',
      },
    },
    'labelSwitchYear': {
      table:{
        category: 'Labels',
      },
    },
  },
};
export default meta;

function render(args: Args) {
  console.log(args);
  return html`
    <post-datepicker id=${args.id} inline="${args.inline}" range="${args.range}" min="${args.min}" max="${args.max}"
    label-toggle-calendar="${args.labelToggleCalendar}"
    label-next-decade="${args.labelNextDecade}"
    label-next-month="${args.labelNextMonth}"
    label-next-year="${args.labelNextYear}"
    label-previous-decade="${args.labelPreviousDecade}"
    label-previous-month="${args.labelPreviousMonth}"
    label-previous-year="${args.labelPreviousYear}"
    label-switch-year="${args.labelSwitchYear}">
      ${!args.inline ? html`<input
          aria-label="Date"
          type="date"
        ></input>` : nothing }
        ${!args.inline && args.range ? html`<input
          aria-label="End date"
          type="date"
        ></input>` : nothing }
    </post-datepicker>`
}

type Story = StoryObj;

export const Default: Story = {};

// For testing purposes
export const Inline: Story = {
  args: {
    inline: true,
    id: 'inline'
  },
};

export const InlineRange: Story = {
  args: {
    inline: true,
    range: true,
    id: 'inline-range'
  },
};

export const Range: Story = {
  args: {
    inline: false,
    range: true,
    id: 'range'
  },
};

export const DisabledDates: Story = {
  decorators: [(story:StoryFn, context: StoryContext) => {
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
      </script>`
  }],
  args: {
    inline: true,
    range: false,
    id: 'disabled-dates'
  },
}
