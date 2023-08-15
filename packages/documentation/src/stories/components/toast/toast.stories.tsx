import React from 'react';
import { Meta, Story, Args, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './toast.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Toast',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    title: 'Titulum',
    content: 'Contentus momentus vero siteos et accusam iretea et justo.',
    variant: 'toast-primary',
    noIcon: false,
    icon: 'null',
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
          'toast-primary': 'Primary',
          'toast-info': 'Info',
          'toast-success': 'Success',
          'toast-danger': 'Danger',
          'toast-warning': 'Warning',
        },
      },
      options: [
        'toast-primary',
        'toast-info',
        'toast-success',
        'toast-danger',
        'toast-warning',
      ],
      table: {
        category: 'General',
      },
    },
    noIcon: {
      name: 'No Icon',
      description: 'Removes the predefined icon completely.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      description: 'Defines a custom icon.',
      if: {
        arg: 'noIcon',
        truthy: false,
      },
      control: {
        type: 'select',
        labels: {
          'null': 'Default',
          'pi-1001': 'Envelope (1001)',
          'pi-2023': 'Cog (2023)',
          'pi-2025': 'Send (2025)',
          'pi-2035': 'Home (2035)',
          'pi-2101': 'Bubble (2101)',
        },
      },
      options: ['null', 'pi-1001', 'pi-2023', 'pi-2025', 'pi-2035', 'pi-2101'],
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
      description: "Defines the component's positionning.",
      control: {
        type: 'radio',
        labels: {
          static: 'Static',
          fixed: 'Fixed',
        },
      },
      options: ['static', 'fixed'],
      table: {
        category: 'Positionning',
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
        category: 'Positionning',
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
        category: 'Positionning',
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
        category: 'Positionning',
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
        category: 'Positionning',
      },
    },
    autoClose: {
      name: 'Closing Delay (in sec.)',
      description:
        'When position set to `fixed`, defines how long the component remains visible before it is automatically closed (in seconds). Set to `0` to disable the auto close.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Positionning',
      },
    },
    show: {
      name: 'Show',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Positionning',
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
  decorators: [
    (Story: Story, { args }) => {
      const [_, updateArgs] = useArgs();

      if (args.stacked) {
        return (
          <div>
            <Story />
            <style>
              {`
            #story--components-toast--stacked .toast-container {
              position: relative;
              inset: 0;
            }

            #story--components-toast--stacked .toast-container > .toast:last-child {
              margin-bottom: 0;
            }
            `}
            </style>
          </div>
        );
      } else if (args.position === 'fixed') {
        return (
          <div>
            <button
              className="btn btn-secondary"
              disabled={args.show}
              onClick={(e: React.MouseEvent) => onToggle(e, args, updateArgs, true)}
            >
              Create toast
            </button>
            <Story />
          </div>
        );
      } else {
        return <Story />;
      }
    },
  ],
} as Meta;

interface ITimeoutStores {
  'Default': ReturnType<typeof setTimeout>[];
  'Auto Close': ReturnType<typeof setTimeout>[];
}

const timeoutStores: ITimeoutStores = {
  'Default': [],
  'Auto Close': [],
};

function onToggle(
  e: React.MouseEvent | null,
  args: Args,
  updateArgs: Function,
  state: boolean | undefined,
) {
  if (e) e.preventDefault();
  if (args.position === 'fixed') updateArgs({ show: state ?? !args.show });
}

function createAutoHideTimeout(
  timeoutStore: ReturnType<typeof setTimeout>[],
  args: Args,
  updateArgs: Function,
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

const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();

  updateAlignments();

  const timeoutStore = timeoutStores[context.name as keyof ITimeoutStores];

  const classes = ['toast', args.variant, args.noIcon && 'no-icon', args.icon]
    .filter(c => c && c !== 'null')
    .join(' ');

  const isFixed = args.position === 'fixed';
  const alginV = args.alignVRestricted ?? args.alignV;
  const alignH = args.alignHRestricted ?? args.alignH;
  const role = isFixed ? 'alert' : 'status';
  const ariaLive = isFixed ? 'assertive' : 'polite';

  const dismissibleButton = (args.dismissible || isFixed) && (
    <button className="toast-close-button" aria-label="close"></button>
  );

  const component = (
    <div
      className={classes}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      onClick={(e: React.MouseEvent) => onToggle(e, args, updateArgs, false)}
      onMouseEnter={() => killAutoHideTimeout(timeoutStore, args)}
      onMouseLeave={() => createAutoHideTimeout(timeoutStore, args, updateArgs)}
    >
      {dismissibleButton}
      <div className="toast-title">{args.title}</div>
      {args.content && <div className="toast-message">{args.content}</div>}
    </div>
  );

  if (args.stacked) {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`toast-container toast-${alginV}-${alignH}`}
      >
        {component}
        {component}
      </div>
    );
  } else if (isFixed) {
    if (args.show) createAutoHideTimeout(timeoutStore, args, updateArgs);

    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`toast-container toast-${alginV}-${alignH}`}
      >
        {args.show && component}
      </div>
    );
  } else {
    return component;
  }

  function updateAlignments() {
    if (args.alignH && args.alignHRestricted && args.alignH !== args.alignHRestricted) {
      args.alignV === 'center'
        ? updateArgs({ alignH: args.alignHRestricted })
        : updateArgs({ alignHRestricted: args.alignH });
    }

    if (args.alignV && args.alignVRestricted && args.alignV !== args.alignVRestricted) {
      args.alignH === 'full-width'
        ? updateArgs({ alignV: args.alignVRestricted })
        : updateArgs({ alignVRestricted: args.alignV });
    }
  }
};

export const Default: Story = Template.bind({});

export const AutoClose: Story = Template.bind({});
AutoClose.parameters = {
  controls: {
    exclude: ['Title', 'Content', 'Variant', 'No Icon', 'Icon', 'Position'],
  },
};
AutoClose.args = {
  position: 'fixed',
  alignV: 'top',
  alignH: 'right',
  autoClose: 6,
};

export const Stacked: Story = Template.bind({});
Stacked.parameters = {
  controls: {
    include: [],
  },
};
Stacked.args = {
  stacked: true,
};
