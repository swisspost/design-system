import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { useArgs } from '@storybook/preview-api';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Button Group',
  render: renderButtonGroup,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    size: '',
    element: 'button',
    label_1: 'Left',
    label_2: 'Middle',
    label_3: 'Right',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Sets the size of the button group.',
      control: {
        type: 'select',
        labels: {
          ' btn-sm': 'Small',
          ' btn-rg': 'Regular',
          ' btn-md': 'Medium',
          ' btn-lg': 'Large',
        },
      },
      options: [' btn-sm', ' btn-rg', ' btn-md', ' btn-lg'],
      table: {
        category: 'General',
      },
    },
    element: {
      name: 'Variant',
      description: 'Defined the semantic elements used as button within the group.',
      control: {
        type: 'radio',
        labels: {
          button: 'Buttons',
          link: 'Links',
          checkbox: 'Checkboxes',
          radio: 'Radio Buttons',
        },
      },
      options: ['button', 'link', 'checkbox', 'radio'],
      table: {
        category: 'General',
      },
    },
    label_1: {
      name: 'First Label',
      description: 'Defines the label of the first button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    label_2: {
      name: 'Second Label',
      description: 'Defines the label of the second button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    label_3: {
      name: 'Third Label',
      description: 'Defines the label of the third button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    checked: {
      name: 'Checked Button',
      description: 'Defined which button is checked in a radio button group.',
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
        },
      },
      options: [1, 2, 3],
      table: {
        category: 'Value',
      },
    },
    selected: {
      name: 'Selected Button',
      description: 'Defined which button is selected in a checkbox group.',
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
        },
      },
      options: [1, 2, 3],
      table: {
        category: 'Value',
      },
    },
  },
  decorators: [
    story =>
      html`
        <div
          @click=${(e: Event) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON') e.preventDefault();
          }}
        >
          ${story()}
        </div>
      `,
  ],
};

export default meta;

type Story = StoryObj;

function createButttonTemplate(args: Args, index: number) {
  const [_, updateArgs] = useArgs();
  const position = index + 1;
  const label = args[`label_${position}`];
  switch (args.element) {
    case 'checkbox': {
      const isSelected = args.selected?.includes(position) ?? false;
      return html`
        <input
          type="checkbox"
          class="btn-check"
          id=${`btncheck${position}`}
          autocomplete="off"
          ?checked="${isSelected}"
          .checked="${isSelected}"
          @change=${(e: Event) => {
            let isChecked = [];
            if ((e.target as HTMLInputElement).checked === true) {
              if (args.selected) {
                isChecked = Array.from(new Set(args.selected.concat(position)));
              } else {
                isChecked = [position];
              }
            } else {
              isChecked = args.selected.filter((p: number) => p !== position);
            }
            updateArgs({ selected: isChecked });
          }}
        />
        <label class=${`btn${args.size} btn-secondary`} for=${`btncheck${position}`}>
          ${label}
        </label>
      `;
    }
    case 'radio': {
      const isChecked = position === args.checked;
      return html`
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id=${`btnradio${position}`}
          autocomplete="off"
          ?checked=${isChecked}
          .checked=${isChecked}
          @change=${(e: Event) => {
            updateArgs({ checked: position });
          }}
        />
        <label class=${`btn${args.size} btn-secondary`} for=${`btnradio${position}`}>
          ${label}
        </label>
      `;
    }
    case 'link':
      return html`
        <a href="#" class=${`btn${args.size} btn-secondary`}>${label}</a>
      `;
    case 'button':
    default:
      return html`
        <button type="button" class=${`btn${args.size} btn-secondary`}>${label}</button>
      `;
  }
}
function renderButtonGroup(args: Args) {
  return html`
    <div class="btn-group" role="group" aria-label="Button group example">
      ${Array.from({ length: 3 }).map((_, i) => createButttonTemplate(args, i))}
    </div>
  `;
}

export const Default: Story = {};

export const Sizing: Story = {
  parameters: {
    controls: {
      exclude: [
        'Variant',
        'First Label',
        'Second Label',
        'Third Label',
        'Checked Button',
        'Selected Button',
      ],
    },
  },
  args: {
    size: ' btn-sm',
  },
};

export const Checks: Story = {
  parameters: {
    controls: {
      exclude: ['Size', 'First Label', 'Second Label', 'Third Label'],
    },
  },
  args: {
    element: 'checkbox',
    selected: [1, 3],
    checked: 2,
  },
};
