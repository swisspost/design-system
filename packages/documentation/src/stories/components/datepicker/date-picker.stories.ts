import { Args, StoryObj, StoryContext, StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { spreadArgs } from '@/utils';

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
  },
};
export default meta;

// Setting different instances of the post-date-picker forces the rerender of the component and make sure it updates when args change
function render(args: Args) {
  if (args.range) {
    return args.inline ? renderInline(args) : renderPopupRange(args);
  } else {
    return args.inline ? renderInline(args) : renderPopupSimple(args);
  }
}

function renderPopupRange(args: Args) {
  return html`
    <post-date-picker ${spreadArgs(args)}>
      <input class="form-control" type="text"></input>
      <p class="form-hint">Format: DD.MM.YYYY - DD.MM.YYYY</p>
    </post-date-picker>`;
}

function renderInline(args: Args) {
  return html` <post-date-picker ${spreadArgs(args)}> </post-date-picker>`;
}

function renderPopupSimple(args: Args) {
  return html`
    <post-date-picker ${spreadArgs(args)}>
      <input class="form-control" type="text"></input>
      <p class="form-hint">Format: DD.MM.YYYY</p>
    </post-date-picker>`;
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
