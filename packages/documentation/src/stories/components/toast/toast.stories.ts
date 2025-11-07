import { useArgs } from 'storybook/preview-api';
import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '825b65c9-7eaf-4e0a-9e20-5f5ed406726d',
  title: 'Components/Toast',
  tags: ['package:Styles', 'status:InProgress'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=85-321',
    },
  },
  args: {
    title: 'Title',
    content: 'This is a sample toast message to demonstrate the component functionality.',
    variant: 'toast-info',
    dismissible: true,
    position: 'static',
    alignV: 'bottom',
    alignVRestricted: 'bottom',
    alignH: 'right',
    alignHRestricted: 'right',
    autoClose: 0,
    show: false,
    stacked: false,
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'The text to insert into the title area.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    content: {
      name: 'Content',
      description: 'The text to insert into the content area.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    variant: {
      name: 'Variant',
      description: 'Defines a style variant.',
      control: {
        type: 'radio',
        labels: {
          'toast-info': 'Info',
          'toast-success': 'Success',
          'toast-error': 'Error',
          'toast-warning': 'Warning',
        },
      },
      options: ['toast-info', 'toast-success', 'toast-error', 'toast-warning'],
      table: {
        category: 'General',
      },
    },
    dismissible: {
      name: 'Dismissible',
      description: 'Adds a dismiss button.',
      if: {
        arg: 'position',
        neq: 'fixed',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    position: {
      name: 'Position',
      description: "Defines the component's Positioning.",
      control: {
        type: 'radio',
        labels: {
          static: 'Static',
          fixed: 'Fixed',
        },
      },
      options: ['static', 'fixed'],
      table: {
        category: 'Positioning',
      },
    },
    alignV: {
      name: 'Vertical',
      description: "When position set to `fixed`, defines the component's vertical position.",
      if: {
        arg: 'alignH',
        neq: 'full-width',
      },
      control: {
        type: 'radio',
        labels: {
          top: 'Top',
          center: 'Center',
          bottom: 'Bottom',
        },
      },
      options: ['top', 'center', 'bottom'],
      table: {
        category: 'Positioning',
      },
    },
    alignVRestricted: {
      name: 'Vertical',
      description: "When position set to `fixed`, defines the component's vertical position.",
      if: {
        arg: 'alignH',
        eq: 'full-width',
      },
      control: {
        type: 'radio',
        labels: {
          top: 'Top',
          bottom: 'Bottom',
        },
      },
      options: ['top', 'bottom'],
      table: {
        category: 'Positioning',
      },
    },
    alignH: {
      name: 'Horizontal',
      description: "When position set to `fixed`, defines the component's horizontal position.",
      if: {
        arg: 'alignV',
        neq: 'center',
      },
      control: {
        type: 'radio',
        labels: {
          'left': 'Left',
          'center': 'Center',
          'right': 'Right',
          'full-width': 'Full Width',
        },
      },
      options: ['left', 'center', 'right', 'full-width'],
      table: {
        category: 'Positioning',
      },
    },
    alignHRestricted: {
      name: 'Horizontal',
      description: "When position set to `fixed`, defines the component's horizontal position.",
      if: {
        arg: 'alignV',
        eq: 'center',
      },
      control: {
        type: 'radio',
        labels: {
          left: 'Left',
          center: 'Center',
          right: 'Right',
        },
      },
      options: ['left', 'center', 'right'],
      table: {
        category: 'Positioning',
      },
    },
    autoClose: {
      name: 'Closing Delay (in sec.)',
      description:
        'Defines how long the component remains visible before it is automatically closed (in seconds). Set to `0` to disable the auto close.',
      if: {
        arg: 'position',
        eq: 'fixed',
      },
      control: {
        type: 'number',
      },
      table: {
        category: 'Positioning',
      },
    },
    show: {
      name: 'Show',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Positioning',
        disable: true,
      },
    },
    stacked: {
      name: 'Stacked',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Stacked',
        disable: true,
      },
    },
  },
  render: render,
  decorators: [
    (story, { args }) => {
      const [_, updateArgs] = useArgs();

      if (args.stacked) {
        return html`
          <div class="toast-container-wrapper-stacked">
            ${story()}
            <style>
              .toast-container-wrapper-stacked .toast-container {
                position: relative;
                inset: 0;
              }

              .toast-container-wrapper-stacked .toast-container > .toast:last-child {
                margin-bottom: 0;
              }
            </style>
          </div>
        `;
      } else if (args.position === 'fixed') {
        return html`
          <div>
            <button
              class="btn btn-secondary"
              ?disabled="${args.show}"
              @click="${(e: MouseEvent) => onToggle(e, args, updateArgs, true)}"
            >
              Create toast
            </button>
            ${story()}
          </div>
        `;
      } else {
        return html` ${story()} `;
      }
    },
  ],
};

export default meta;

type Story = StoryObj;

interface ITimeoutStores {
  'Default': ReturnType<typeof setTimeout>[];
  'Auto Close': ReturnType<typeof setTimeout>[];
}

const timeoutStores: ITimeoutStores = {
  'Default': [],
  'Auto Close': [],
};

function onToggle(
  e: MouseEvent | null,
  args: Args,
  updateArgs: (newArgs: Partial<Args>) => void,
  state: boolean | undefined,
) {
  if (e) e.preventDefault();
  if (args.position === 'fixed') updateArgs({ show: state ?? !args.show });
}

function createAutoHideTimeout(
  timeoutStore: ReturnType<typeof setTimeout>[],
  args: Args,
  updateArgs: (newArgs: Partial<Args>) => void,
) {
  if (args.position === 'fixed' && args.autoClose > 0 && timeoutStore.length === 0) {
    timeoutStore.push(
      setTimeout(() => {
        onToggle(null, args, updateArgs, false);
        killAutoHideTimeout(timeoutStore, args);
      }, args.autoClose * 1000),
    );

    if (timeoutStore.length > 1) {
      timeoutStore
        .slice(0, -1)
        .forEach((timeoutId: ReturnType<typeof setTimeout>) => clearTimeout(timeoutId));

      timeoutStore = timeoutStore.slice(-1);
    }
  }
}

function killAutoHideTimeout(timeoutStore: ReturnType<typeof setTimeout>[], args: Args) {
  if (args.position === 'fixed' && timeoutStore.length > 0) {
    clearTimeout(timeoutStore.pop());
  }
}

function getDismissButton(args: Args, isFixed: boolean) {
  return args.dismissible || isFixed ? html` <post-closebutton>Close</post-closebutton> ` : null;
}

function render(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  updateAlignments(args, updateArgs);

  const timeoutStore =
    timeoutStores[context.name as keyof ITimeoutStores] || timeoutStores['Default'];

  const isFixed = args.position === 'fixed';

  const classes = ['toast', args.variant, (args.dismissible || isFixed) && 'toast-dismissible']
    .filter(c => c && c !== 'null')
    .join(' ');

  const alignV = args.alignVRestricted ?? args.alignV;
  const alignH = args.alignHRestricted ?? args.alignH;
  let role;
  let ariaLive;
  if (isFixed) {
    role = 'alert';
    ariaLive = 'assertive';
  } else {
    role = 'status';
    ariaLive = 'polite';
  }

  const dismissButton = getDismissButton(args, isFixed);

  const component = html`
    <div
      class="${classes}"
      role="${role}"
      aria-live="${ariaLive}"
      aria-atomic="true"
      @click="${(e: MouseEvent) => onToggle(e, args, updateArgs, false)}"
      @mouseenter="${() => killAutoHideTimeout(timeoutStore, args)}"
      @mouseleave="${() => createAutoHideTimeout(timeoutStore, args, updateArgs)}"
    >
      ${dismissButton}
      <div class="toast-title">${args.title}</div>
      ${args.content ? html` <div class="toast-message">${args.content}</div> ` : null}
    </div>
  `;

  let wrappedContent;
  if (args.stacked) {
    wrappedContent = html` ${component} ${component} `;
  } else if (isFixed) {
    wrappedContent = html` <div style="${args.show ? '' : 'display: none;'}">${component}</div> `;

    if (args.show) {
      createAutoHideTimeout(timeoutStore, args, updateArgs);
    }
  } else {
    return component;
  }
  return html`
    <div
      aria-live="polite"
      aria-atomic="true"
      class="${`toast-container toast-${alignV}-${alignH}`}"
    >
      ${wrappedContent}
    </div>
  `;
}

function updateAlignments(args: Args, updateArgs: (newArgs: Partial<Args>) => void) {
  if (args.alignH && args.alignHRestricted && args.alignH !== args.alignHRestricted) {
    if (args.alignV === 'center') {
      updateArgs({ alignH: args.alignHRestricted });
    } else {
      updateArgs({ alignHRestricted: args.alignH });
    }
  }

  if (args.alignV && args.alignVRestricted && args.alignV !== args.alignVRestricted) {
    if (args.alignH === 'full-width') {
      updateArgs({ alignV: args.alignVRestricted });
    } else {
      updateArgs({ alignVRestricted: args.alignV });
    }
  }
}

export const Default: Story = {};

export const AutoClose: Story = {
  args: {
    position: 'fixed',
    alignV: 'top',
    alignH: 'right',
    autoClose: 6,
  },
};

export const Stacked: Story = {
  args: {
    stacked: true,
  },
};
