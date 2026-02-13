import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { useArgs, useState } from 'storybook/preview-api';
import { nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '047501dd-a185-4835-be91-09130fa3dad9',
  title: 'Components/Card Control',
  tags: ['package:Styles', 'status:InProgress'],
  render: renderComponent,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=22630-6854&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    type: 'checkbox',
    label: 'Label',
    description: '',
    icon: 'none',
    checked: false,
    disabled: false,
    validation: 'null',
  },
  argTypes: {
    type: {
      name: 'Type',
      type: {
        required: true,
        name: 'string',
      },
      description: 'The type of the input element.',
      control: {
        type: 'radio',
        labels: {
          checkbox: 'Checkbox',
          radio: 'Radio',
        },
      },
      options: ['checkbox', 'radio'],
      table: {
        category: 'General',
      },
    },
    label: {
      name: 'Label',
      type: {
        required: true,
        name: 'string',
      },
      description: 'The main label of the input',
      table: {
        category: 'General',
      },
    },
    description: {
      name: 'Description',
      description: 'A short additional description',
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
      },
      options: ['none', 'component', 'letter', 'letteropen', 'parcel'],
      table: {
        category: 'General',
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description:
        'Defines the validation state of the card control and controls the display of the corresponding return message.<post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs##card-control">validation guidelines here</a>.</p></post-banner> ',
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
  },
};

export default meta;

// DECORATORS

// RENDERER

class RenderHelper {
  private id = 1;

  private storyName(context: StoryContext): string {
    return context.name.replaceAll(' ', '_');
  }

  public componentId(args: Args, context: StoryContext): string {
    const storyName = this.storyName(context);
    return `${storyName}_${this.id++}`;
  }

  public validationId(context: StoryContext): string {
    const storyName = this.storyName(context);
    return `${storyName}_${this.id++}_Validation_Message`;
  }

  public validation(id: string) {
    return html`<p class="invalid-feedback" id=${id}>Invalid message.</p>`;
  }
}

const _ = new RenderHelper();

function renderComponent(args: Args, context: StoryContext) {
  const [_args, updateArgs] = useArgs();
  const [id] = useState(_.componentId(args, context));
  const [validationId] = useState(_.validationId(context));

  const classes = args.class ? `card-control ${args.class}` : 'card-control';

  function icon() {
    if (args.customIcon) {
      const icon = args.customIcon === 'svg' ? args.customIconSvg : args.customIconImg;
      return html`<div class="card-control--icon">${unsafeHTML(icon)}</div>`;
    } else {
      return args.icon && args.icon !== 'none'
        ? html`<post-icon
            class="card-control--icon"
            name="${args.icon}"
            aria-hidden="true"
          ></post-icon>`
        : nothing;
    }
  }

  function description() {
    return args.description
      ? html`<div class="card-control--description">${args.description}</div>`
      : nothing;
  }

  function customContent() {
    return args.customContent ? html`${unsafeHTML(args.customContent)}` : nothing;
  }

  function onChange(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    updateArgs({ checked: target?.checked ?? false });
  }

  return html` <post-linkarea class=${classes}>
      <input
        id=${id}
        class=${args.validation === 'null' ? nothing : args.validation}
        type=${args.type}
        name=${args.type === 'radio' && args.groupName ? args.groupName : nothing}
        ?checked=${args.checked}
        disabled=${args.disabled ? 'disabled' : nothing}
        aria-invalid=${args.groupName || args.validation === 'null' ? nothing : 'true'}
        aria-describedby=${args.groupName || args.validation === 'null'
          ? nothing
          : `${id} ${validationId}`}
        @input="${onChange}"
        @change="${onChange}"
      />
      <label for=${id}>${args.label}</label>
      ${icon()} ${description()} ${customContent()}
    </post-linkarea>

    ${args.groupName ? nothing : _.validation(validationId)}`;
}

// STORIES
const STORY_GROUPING_AMOUNT_OF_ITEMS = 3;
const STORY_LINEUP_LABELS = [
  'Mondays',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday & Sunday',
];
const STORY_LINEUP_DESCRIPTIONS = [
  'The first day of the week.',
  'This is the second day of the week and usually follows the Monday.',
  'It`s Wednesday my dudes!',
  'Almost the end of the working week.',
  'The fifth day of the week, often considered the gateway to the weekend.',
  'Have a great weekend and see you next week.',
];

type Story = StoryObj;

export const Default: Story = {};

export const CustomIcon: Story = {
  parameters: {
    docs: {
      controls: {
        include: ['Custom Icon'],
      },
    },
  },
  args: {
    customIcon: 'svg',
    customIconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="-31.5 0 319 319"><defs><path id="a" d="M9.872 293.324.012 30.574C-.315 21.895 6.338 14.54 15.005 14L238.494.032c8.822-.552 16.42 6.153 16.972 14.975.02.332.031.665.031.998v286.314c0 8.839-7.165 16.004-16.004 16.004-.24 0-.48-.005-.718-.016l-213.627-9.595c-8.32-.373-14.963-7.065-15.276-15.388Z"/></defs><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><use xlink:href="#a" fill="#FF4785"/><path fill="#fff" d="m188.665 39.127 1.527-36.716L220.884 0l1.322 37.863a2.387 2.387 0 0 1-3.864 1.96l-11.835-9.325-14.013 10.63a2.387 2.387 0 0 1-3.829-2.001Zm-39.251 80.853c0 6.227 41.942 3.243 47.572-1.131 0-42.402-22.752-64.684-64.415-64.684-41.662 0-65.005 22.628-65.005 56.57 0 59.117 79.78 60.249 79.78 92.494 0 9.052-4.433 14.426-14.184 14.426-12.705 0-17.729-6.49-17.138-28.552 0-4.786-48.458-6.278-49.936 0-3.762 53.466 29.548 68.887 67.665 68.887 36.935 0 65.892-19.687 65.892-55.326 0-63.36-80.961-61.663-80.961-93.06 0-12.728 9.455-14.425 15.07-14.425 5.909 0 16.546 1.042 15.66 24.801Z" mask="url(#b)"/></svg>',
    customIconImg: '<img src="https://picsum.photos/id/433/100/80" alt="My Custom Icon Image"/>',
  },
  argTypes: {
    customIcon: {
      name: 'Custom Icon',
      description: 'Choose between your preferred custom icon type.',
      control: {
        type: 'radio',
        labels: {
          svg: 'Vector Graphic',
          img: 'Pixel Image',
        },
      },
      options: ['svg', 'img'],
      table: {
        type: { summary: 'svg | img' },
      },
    },
  },
};

export const CustomContent: Story = {
  parameters: {
    docs: {
      controls: {
        include: ['Custom Content'],
      },
    },
  },
  args: {
    icon: 'component',
    customContent:
      '<ul class="list-bullet"><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>',
  },
  argTypes: {
    customContent: {
      name: 'Custom Content',
      description: 'Add custom HTML content to be added within the component.',
    },
  },
};

export const Grouping: Story = {
  parameters: {
    docs: {
      controls: {
        include: ['Type', 'Disabled', 'Validation'],
      },
    },
  },
  args: {
    groupName: 'grouping_group',
  },
  render: (args: Args, context: StoryContext) => {
    const [validationId] = useState(_.validationId(context));

    return html`<fieldset
      disabled=${args.disabled ? 'disabled' : nothing}
      aria-invalid=${args.validation === 'null' ? nothing : 'true'}
      aria-describedby=${args.validation === 'null' ? nothing : validationId}
    >
      <legend>Group Legend</legend>

      ${Array.from({ length: STORY_GROUPING_AMOUNT_OF_ITEMS }).map(render)}
      ${_.validation(validationId)}
    </fieldset>`;

    function render(_v: unknown, i: number) {
      const label = `Label ${i + 1}`;
      return html`${meta.render?.({ ...args, label, checked: undefined }, context)}`;
    }
  },
};

export const Lineup: Story = {
  args: {
    class: 'h-full',
  },
  render: (args: Args, context: StoryContext) => {
    return html`<div class="row g-16">
      ${STORY_LINEUP_LABELS.map(
        (label: string, i: number) =>
          html`<div class="col-sm-6 col-lg-4">
            ${meta.render?.(
              {
                ...args,
                checked: undefined,
                label,
                description: STORY_LINEUP_DESCRIPTIONS[i],
              },
              context,
            )}
          </div>`,
      )}
    </div>`;
  },
};
