import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e',
  title: 'Components/Datepicker',
  component: 'post-datepicker',
  tags: ['package:WebComponents'],
  render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=21044-101376&t=FNgdl36MZPMbc1Bs-4',
    },
  },
  args: {
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
    <post-datepicker inline="${args.inline}" range="${args.range}" min="${args.min}" max="${args.max}"
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

export const Default: StoryObj = {};

// For testing purposes
export const Inline: StoryObj = {
  args: {
    inline: true
  },
};

export const InlineRange: StoryObj = {
  args: {
    inline: true,
    range: true
  },
};

export const Range: StoryObj = {
  args: {
    inline: false,
    range: true
  },
};
