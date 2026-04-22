import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { useArgs } from 'storybook/preview-api';
import { MetaComponent } from '@root/types';

const BUTTON_LABELS = ['Letters', 'Parcel', 'Stamp', 'Mail', 'Packages', 'Pickup'];
const BUTTON_ICONS = [
  'letter',
  'parcel',
  'stampapost',
  'mailboxprivate',
  'bulkparcels',
  'transporter',
];

const meta: MetaComponent = {
  id: '021d61aa-e039-4858-b4b9-b86a3e772811',
  title: 'Components/Button Group',
  tags: ['package:Styles', 'status:Stable'],
  render: renderButtonGroup,
  parameters: {
    badges: [],
    controls: {
      exclude: ['disabledElement', 'groupClass'],
    },
  },
  args: {
    element: 'radio',
    labelContent: 'iconAndText',
    direction: 'horizontal',
    disabledElement: null,
    groupClass: 'btn-group-vertical btn-group-lg-horizontal',
  },
  argTypes: {
    disabledElement: {
      control: {
        type: 'radio',
      },
      options: [null, 0, 1, 2, 3, 4],
    },
    groupClass: {
      control: {
        type: 'text',
      },
    },
    labelContent: {
      name: 'Label content',
      description: 'Whether the buttons have an icon and/or text.',
      control: {
        type: 'inline-radio',
        labels: {
          textOnly: 'Text only',
          iconOnly: 'Icon only',
          iconAndText: 'Icon and text',
        },
      },
      options: ['textOnly', 'iconOnly', 'iconAndText'],
      table: {
        category: 'Content',
      },
    },
    direction: {
      name: 'Direction',
      description: 'Whether the buttons are stacked horizontally or vertically.',
      control: {
        type: 'radio',
        labels: {
          horizontal: 'Horizontal (default)',
          vertical: 'Vertical',
        },
      },
      options: ['horizontal', 'vertical'],
      table: {
        category: 'General',
      },
    },
    element: {
      name: 'Variant',
      description: 'Defines the semantic elements used as button within the group.',
      control: {
        type: 'radio',
        labels: {
          radio: 'Radio Buttons',
          checkbox: 'Checkboxes',
          button: 'Buttons',
          link: 'Links',
        },
      },
      options: ['radio', 'checkbox', 'button', 'link'],
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked Button',
      description: 'Defines which button is checked in a radio button group.',
      if: {
        arg: 'element',
        eq: 'radio',
      },
      control: {
        type: 'inline-radio',
        labels: {
          1: 'First',
          2: 'Second',
          3: 'Third',
          4: 'Fourth',
        },
      },
      options: [1, 2, 3, 4],
      table: {
        category: 'Value',
      },
    },
    selected: {
      name: 'Selected Button',
      description: 'Defines which buttons are selected in a checkbox group.',
      if: {
        arg: 'element',
        eq: 'checkbox',
      },
      control: {
        type: 'inline-check',
        labels: {
          1: 'First',
          2: 'Second',
          3: 'Third',
          4: 'Fourth',
        },
      },
      options: [1, 2, 3, 4],
      table: {
        category: 'Value',
      },
    },
  },
  decorators: [
    story => html`
      <div
        @click="${(e: Event) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'A' || target.tagName === 'BUTTON') e.preventDefault();
        }}"
      >
        ${story()}
      </div>
    `,
  ],
};

export default meta;

type Story = StoryObj;

function createButtonTemplate(args: Args, context: StoryContext, index: number) {
  const [_, updateArgs] = useArgs();
  const position = index + 1;
  const id = `btngroup_${context.name}_${position}`;
  const name = `btngroup_${context.name}`;
  const text = BUTTON_LABELS[index];
  const visuallyHiddenText = html`<span class="visually-hidden">${text}</span>`;
  const icon = html`<post-icon name="${BUTTON_ICONS[index]}"></post-icon>`;
  const label = html`${args.labelContent !== 'textOnly' ? icon : nothing}
  ${args.labelContent !== 'iconOnly' ? text : visuallyHiddenText}`;

  switch (args.element) {
    case 'checkbox': {
      const isSelected = args.selected?.includes(position) ?? false;
      return html`
        <input
          type="checkbox"
          class="btn-check"
          id="${id}"
          ?disabled="${args.disabledElement === index}"
          ?checked="${isSelected}"
          .checked="${isSelected}"
          @change="${(e: Event) => {
            let isChecked = [];
            if ((e.target as HTMLInputElement).checked) {
              if (args.selected) {
                isChecked = Array.from(new Set(args.selected.concat(position)));
              } else {
                isChecked = [position];
              }
            } else {
              isChecked = args.selected.filter((p: number) => p !== position);
            }
            updateArgs({ selected: isChecked });
          }}"
        />
        <label for="${id}"> ${label}</label>
      `;
    }
    case 'radio': {
      const isChecked = position === args.checked;
      return html`
        <input
          type="radio"
          class="btn-check"
          ?disabled="${args.disabledElement === index}"
          name="${name}"
          id="${id}"
          ?checked="${isChecked}"
          .checked="${isChecked}"
          @change="${() => {
            updateArgs({ checked: position });
          }}"
        />
        <label for="${id}">${label}</label>
      `;
    }
    case 'link':
      return html` <a href="#">${label}</a> `;
    case 'button':
    default:
      return html` <button type="button">${label}</button> `;
  }
}

function renderButtonGroup(args: Args, context: StoryContext) {
  const buttons = Array.from({ length: 4 }).map((_, i) => createButtonTemplate(args, context, i));
  const groupClass = args.direction === 'vertical' ? 'btn-group btn-group-vertical' : 'btn-group';

  if (args.element === 'radio' || args.element === 'checkbox') {
    return html`
      <fieldset class="${groupClass}">
        <legend class="visually-hidden">Button group example</legend>
        ${buttons}
      </fieldset>
    `;
  } else {
    return html`
      <div class="${groupClass}" role="group" aria-label="Button group example">${buttons}</div>
    `;
  }
}

function renderButtonGroupDirection(args: Args, context: StoryContext) {
  return html`
    <div class="btn-group ${args.groupClass}" role="group" aria-label="Button group example">
      ${Array.from({ length: 6 }).map((_, i) => createButtonTemplate(args, context, i))}
    </div>
  `;
}

export const Default: Story = {};

export const Checks: Story = {
  args: {
    element: 'checkbox',
    selected: [1, 3],
  },
};

export const Radios: Story = {
  args: {
    element: 'radio',
    checked: 1,
    disabledElement: 3,
  },
};

export const Direction: Story = {
  render: renderButtonGroupDirection,
  args: {
    element: 'button',
  },
};
