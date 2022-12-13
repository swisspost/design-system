import React from 'react';
import { Meta, Story, Args, StoryContext, ReactFramework } from "@storybook/react";
import { useArgs } from '@storybook/client-api';
import docsPage from './toast.docs.mdx';

export default {
  title: 'Components/Toast',
  parameters: {
    docs: {
      page: docsPage
    }
  },
  args: {
    title: 'Titulum',
    content: 'Contentus momentus vero siteos et accusam iretea et justo.',
    variant: 'toast-notification',
    noIcon: false,
    icon: 'null',
    dismissible: true,
    alignment: false,
    alignV: 'bottom',
    alignH: 'right',
    show: false,
    autoHideTimeout: null
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'The text to insert into the title area.',
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
      }
    },
    content: {
      name: 'Content',
      description: 'The text to insert into the content area.',
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
      }
    },
    variant: {
      name: 'Variant',
      description: 'Defines a style variant.',
      control: {
        type: 'radio',
        labels: {
          'toast-notification': 'Notification',
          'toast-info': 'Info',
          'toast-success': 'Success',
          'toast-danger': 'Danger',
          'toast-warning': 'Warning'
        }
      },
      options: [
        'toast-notification',
        'toast-info',
        'toast-success',
        'toast-danger',
        'toast-warning'
      ],
      table: {
        category: 'General'
      }
    },
    noIcon: {
      name: 'No Icon',
      description: 'Removes the predefined icon completely.',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    icon: {
      name: 'Icon',
      description: 'Defines a custom icon.',
      if: {
        arg: 'noIcon',
        truthy: false
      },
      control: {
        type: 'select',
        labels: {
          'null': 'Default',
          'pi-1001': 'Envelope (1001)',
          'pi-2023': 'Cog (2023)',
          'pi-2025': 'Send (2025)',
          'pi-2035': 'Home (2035)',
          'pi-2101': 'Bubble (2101)'
        }
      },
      options: [
        'null',
        'pi-1001',
        'pi-2023',
        'pi-2025',
        'pi-2035',
        'pi-2101'
      ],
      table: {
        category: 'General'
      }
    },
    dismissible: {
      name: 'Dismissible',
      description: 'Adds a dismiss button.',
      if: {
        arg: 'alignment',
        truthy: false
      },
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    alignment: {
      name: 'Alignment',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'Live Examples'
      }
    },
    alignV: {
      name: 'Vertical',
      if: {
        arg: 'alignment'
      },
      control: {
        type: 'radio',
        labels: {
          top: 'Top',
          center: 'Center',
          bottom: 'Bottom'
        }
      },
      options: [
        'top',
        'center',
        'bottom'
      ],
      table: {
        category: 'Live Examples'
      }
    },
    alignH: {
      name: 'Horizontal',
      if: {
        arg: 'alignment'
      },
      control: {
        type: 'radio',
        labels: {
          left: 'Left',
          center: 'Center',
          right: 'Right',
          'full-width': 'Full Width'
        }
      },
      options: [
        'left',
        'center',
        'right',
        'full-width'
      ],
      table: {
        category: 'Live Examples'
      }
    },
    show: {
      name: 'Show',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'Live Examples',
        disable: true
      }
    },
    autoHideTimeout: {
      name: 'Auto Hide Timeout',
      table: {
        disable: true
      }
    }
  }
} as Meta;

let autoHideTimeoutIds: ReturnType<typeof setTimeout>[] = [];

function onToggle (e: React.MouseEvent | null, args: Args, updateArgs: Function, state: boolean | undefined) {
  if (e !== null) e.preventDefault();
  if (args.alignment) updateArgs({ show: state ?? !args.show });
}

function createAutoHideTimeout(args: Args, updateArgs: Function) {
  if (args.alignment) {
    autoHideTimeoutIds.push(setTimeout(() => { onToggle(null, args, updateArgs, false); }, 12000));

    if (autoHideTimeoutIds.length > 1) {
      autoHideTimeoutIds
        .slice(0, -1)
        .forEach((timeoutId: ReturnType<typeof setTimeout>) => clearTimeout(timeoutId));
    
      autoHideTimeoutIds = autoHideTimeoutIds.slice(-1);
    }
  }
}

function killAutoHideTimeout (args: Args) {
  if (args.alignment && autoHideTimeoutIds.length > 0) {
    clearTimeout(autoHideTimeoutIds.pop());
  }
}

const Template = (args: Args) => {
  const [_, updateArgs] = useArgs();

  const classes = [
    'toast',
    args.variant,
    args.noIcon && 'no-icon',
    args.icon
  ].filter(c => c && c !== 'null').join(' ');
  
  const role = args.alignment ? 'alert' : 'status';
  const ariaLive = args.alignment ? 'assertive' : 'polite';

  const dismissibleButton = (args.dismissible || args.alignment) && <button className="toast-close-button" aria-label="close"></button>;

  const component = <div
    className={ classes }
    role={ role }
    aria-live={ ariaLive }
    aria-atomic="true"
    onClick={ (e: React.MouseEvent) => onToggle(e, args, updateArgs, false) }
    onMouseEnter={ (e: React.MouseEvent) => killAutoHideTimeout(args) }
    onMouseLeave={ (e: React.MouseEvent) => createAutoHideTimeout(args, updateArgs) }
  >
    { dismissibleButton }
    <div className="toast-title">{ args.title }</div>
    { args.content && <div className="toast-message">{ args.content }</div> }
  </div>;

  if (args.alignment) {
    if (args.show) createAutoHideTimeout(args, updateArgs);

    return <div aria-live="polite" aria-atomic="true" className={ `toast-container toast-${args.alignV}-${args.alignH}`}>
      { args.show && component }
    </div>;
  } else {
    return component;
  }
};

export const Default: Story = Template.bind({});
Default.decorators = [
  (Story: Story, { args }) => {
    const [_, updateArgs] = useArgs();

    if (args.alignment) {
      return <div>
        <button className="btn btn-secondary" disabled={ args.show } onClick={ (e: React.MouseEvent) => onToggle(e, args, updateArgs, true) }>Create toast</button>
        <Story/>
      </div>;
    } else {
      return <Story/>
    }
  }
];

export const AutoClose: Story = Template.bind({});
AutoClose.decorators = [
  (Story: Story, { args }) => {
    const [_, updateArgs] = useArgs();

    return <div>
      <button className="btn btn-secondary" disabled={ args.show } onClick={ (e: React.MouseEvent) => onToggle(e, args, updateArgs, true) }>Create toast</button>
      <Story/>
    </div>;
  }
];
AutoClose.parameters = {
  controls: {
    excluded: [
      'Titel',
      'Content',
      'Variant',
      'No Icon',
      'Icon',
      'Alignment'
    ]
  }
};
AutoClose.args = {
  alignment: true,
  alignV: 'top',
  alignH: 'right'
};