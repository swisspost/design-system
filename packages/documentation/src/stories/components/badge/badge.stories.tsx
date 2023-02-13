import React from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './badge.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Badge',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
  },
  args: {
    text: 'Badge',
    size: 'default',
    nested: false,
    nestedNumber: 10,
    checkable: false,
    checked: false,
    dismissible: false,
    dismissed: false,
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'The text to insert into the badge.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the component.',
      control: {
        type: 'radio',
        labels: {
          'default': 'Default',
          'badge-sm': 'Small',
        },
      },
      options: ['default', 'badge-sm'],
      table: {
        category: 'General',
      },
    },
    nested: {
      name: 'Nested',
      description: 'Adds a nested `.badge` element into the component.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    nestedNumber: {
      name: 'Number',
      description: 'Defines the number within the nested `.badge` element.',
      if: {
        arg: 'nested',
      },
      control: {
        type: 'number',
      },
      table: {
        category: 'Content',
      },
    },
    checkable: {
      name: 'Checkable',
      description:
        'Adds the checkable styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      if: {
        arg: 'dismissible',
        truthy: false,
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Variations',
      },
    },
    checked: {
      name: 'Checked',
      description: 'When set to `true`, places the component in the checked state.',
      if: {
        arg: 'checkable',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Variations',
      },
    },
    dismissible: {
      name: 'Dismissible',
      description:
        'Adds the dismissible styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      if: {
        arg: 'checkable',
        truthy: false,
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Variations',
      },
    },
    dismissed: {
      name: 'Dismissed',
      description: 'When set to `true`, places the component in a dismissible state.',
      if: {
        arg: 'dismissible',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Variations',
      },
    },
  },
  decorators: [
    (Story: Story, { args }) => {
      const [_, updateArgs] = useArgs();

      return (
        <div>
          {args.dismissible && args.dismissed ? (
            <a
              href="#"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                updateArgs({ dismissed: false });
              }}
            >
              Show badge
            </a>
          ) : null}
          <Story />
        </div>
      );
    },
  ],
} as Meta;

const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();

  const classes = [
    args.checkable ? 'badge-check' : 'badge',
    args.size === 'default' ? null : args.size,
  ]
    .filter(c => c && c !== 'null')
    .join(' ');
  const checkableId = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_CheckableBadge`;
  const checkableClasses = ['badge-check-label', args.size === 'default' ? null : args.size]
    .filter(c => c && c !== 'null')
    .join(' ');

  const useDefaultContent = !args.checkable && !args.dismissible;

  const content: JSX.Element[] = [
    !args.nested ? args.text : null,
    args.nested ? <span key="text">{args.text}</span> : null,
    args.nested ? (
      <span key="nested" className="badge">
        {args.nestedNumber}
      </span>
    ) : null,
  ];

  const checkableContent: (JSX.Element | null)[] = [
    <input
      key="input"
      id={checkableId}
      className="badge-check-input"
      type="checkbox"
      checked={args.checked}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        updateArgs({ checked: !args.checked });

        if (document.activeElement === e.target) {
          setTimeout(() => {
            const element: HTMLInputElement | null = document.querySelector(`#${checkableId}`);
            if (element) element.focus();
          }, 25);
        }
      }}
    />,
    <label key="label" className={checkableClasses} htmlFor={checkableId}>
      {content}
    </label>,
  ];

  const dismissibleContent: (JSX.Element | null)[] = [
    ...content,
    <button
      key="dismiss-button"
      className="btn-close"
      dismiss-label="dismiss"
      onClick={() => updateArgs({ dismissed: true })}
    ></button>,
  ];

  if (args.dismissible && args.dismissed) {
    return <></>;
  } else {
    return (
      <div className={classes}>
        {useDefaultContent && content}
        {args.checkable && checkableContent}
        {args.dismissible && dismissibleContent}
      </div>
    );
  }
};

export const Default: Story = Template.bind({});

export const Checkable: Story = Template.bind({});
Checkable.parameters = {
  controls: {
    exclude: ['checkable', 'dismissible'],
  },
};
Checkable.args = {
  text: 'Checkable Badge',
  checkable: true,
};

export const Dismissible: Story = Template.bind({});
Dismissible.parameters = {
  controls: {
    exclude: ['checkable', 'dismissible'],
  },
};
Dismissible.args = {
  text: 'Dismissible Badge',
  dismissible: true,
};
