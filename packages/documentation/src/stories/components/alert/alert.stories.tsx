import React from 'react';
import { Meta, Story, Args } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { useArgs } from '@storybook/client-api';
import parse from 'html-react-parser';
import docsPage from './alert.docs.mdx';
import { getAlertClasses } from './getAlertClasses';

export default {
  title: 'Components/Alert',
  parameters: {
    docs: {
      page: docsPage,
    },
    controls: {
      exclude: ['Title', 'Content'],
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    title: 'Titulum',
    content: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
    variant: 'alert-primary',
    noIcon: false,
    icon: 'null',
    dismissible: false,
    fixed: false,
    action: false,
    show: true,
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    content: {
      name: 'Content',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    variant: {
      name: 'Variant',
      description: 'Defines a style variant.',
      control: {
        type: 'radio',
        labels: {
          'alert-primary': 'Primary',
          'alert-success': 'Success',
          'alert-danger': 'Danger',
          'alert-warning': 'Warning',
          'alert-info': 'Info',
          'alert-gray': 'Gray',
        },
      },
      options: ['alert-primary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-gray'],
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
          '1001': 'Envelope (1001)',
          '2023': 'Cog (2023)',
          '2025': 'Send (2025)',
          '2035': 'Home (2035)',
          '2101': 'Bubble (2101)',
        },
      },
      options: ['null', '1001', '2023', '2025', '2035', '2101'],
      table: {
        category: 'General',
      },
    },
    dismissible: {
      name: 'Dismissible',
      description:
        'Adds the dismissible styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      control: { type: 'boolean' },
      table: {
        category: 'Variations',
      },
    },
    fixed: {
      name: 'Fixed',
      description:
        'Adds the fixed styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      control: { type: 'boolean' },
      table: {
        category: 'Variations',
      },
    },
    action: {
      name: 'Action Buttons',
      description:
        'Adds the action button styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      control: { type: 'boolean' },
      table: {
        category: 'Variations',
      },
    },
    show: {
      name: 'Show',
      control: { type: 'boolean' },
      table: { disable: true },
    },
  },
} as Meta;

function onShowToggle(e: React.MouseEvent, args: Args, updateArgs: Function) {
  e.preventDefault();
  updateArgs({ show: !args.show });
}

const Template = (args: Args) => {
  const [_, updateArgs] = useArgs();

  const classes = getAlertClasses(args);

  // every time you want to parse one or more elements to a JSX.Element[], concat all the elements to a string and parse them all
  // even if it would be possible to write some of them directly
  // the reason for this is, that react elements in a list need a "key" property, single elements don't
  // and the parser only creates this property, when it receives multiple elements to parse
  const content: JSX.Element[] | JSX.Element | string = parse(
    `<h4 class="alert-heading" key="title">${args.title}</h4>${args.content}`,
  );

  return (
    <div className={classes} role="alert">
      {/* Dismissible Button */}
      {args.dismissible || args.fixed ? (
        <button
          className="btn-close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}
        ></button>
      ) : null}

      {/* Alert Content */}
      {args.action ? <div className="alert-content">{content}</div> : content}

      {/* Alert Action Buttons */}
      {args.action ? (
        <div className="alert-buttons">
          <button
            className="btn btn-primary btn-animated"
            onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}
          >
            <span>Akcepti</span>
          </button>
          <button
            className="btn btn-secondary btn-animated"
            onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}
          >
            <span>Aborti</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export const Default: Story = Template.bind({});
Default.decorators = [
  (Story: Story, { args }) => {
    const [_, updateArgs] = useArgs();
    const showToggleButton = args.fixed;
    const showResetButton = !showToggleButton && args.dismissible && !args.show;

    return (
      <div>
        {showToggleButton ? (
          <button
            className="btn btn-secondary"
            onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}
          >
            Toggle alert
          </button>
        ) : null}
        {showResetButton ? (
          <a href="#" onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}>
            Show alert
          </a>
        ) : null}
        <Story />
      </div>
    );
  },
];

export const AdditionalContent: Story = Template.bind({});
AdditionalContent.parameters = {
  controls: {
    exclude: ['Variant', 'Icon', 'No Icon', 'Dismissible', 'Fixed', 'Action Buttons', 'Show'],
  },
};
AdditionalContent.args = {
  content: `<p>Contentum momentum ipsum tipsum sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
  <ul>
    <li>Un orde redlis titem</li>
    <li>An deven moreun orde redlis titem</li>
    <li>Thel astofu orde redlis titem</li>
  </ul>
<hr />
<p>An deven morecon tentum no sea takimata sanctus est magna aliquyam erat.</p>`,
  variant: 'alert-success',
};

export const Dismissible: Story = Template.bind({});
Dismissible.decorators = [
  (Story: Story, { args }) => {
    const [_, updateArgs] = useArgs();

    return (
      <div>
        {args.show ? null : (
          <a href="#" onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}>
            Show alert
          </a>
        )}
        <Story />
      </div>
    );
  },
];
Dismissible.parameters = {
  controls: {
    exclude: ['Variant', 'Icon', 'No Icon', 'Fixed', 'Action Buttons', 'Show'],
  },
};
Dismissible.args = {
  dismissible: true,
};

export const Fixed: Story = Template.bind({});
Fixed.decorators = [
  (Story: Story, { args }) => {
    const [_, updateArgs] = useArgs();

    return (
      <div>
        <button
          className="btn btn-secondary"
          onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}
        >
          Toggle alert
        </button>
        <Story />
      </div>
    );
  },
];
Fixed.parameters = {
  controls: {
    exclude: ['Variant', 'Icon', 'No Icon', 'Dismissible', 'Action Buttons', 'Show'],
  },
};
Fixed.args = {
  fixed: true,
  show: false,
};

export const ActionButtons: Story = Template.bind({});
ActionButtons.decorators = [
  (Story: Story, { args }) => {
    const [_, updateArgs] = useArgs();

    return (
      <div>
        <button
          className="btn btn-secondary"
          onClick={(e: React.MouseEvent) => onShowToggle(e, args, updateArgs)}
        >
          Toggle alert
        </button>
        <Story />
      </div>
    );
  },
];
ActionButtons.parameters = {
  controls: {
    exclude: ['Variant', 'Icon', 'No Icon', 'Dismissible', 'Fixed', 'Show'],
  },
};
ActionButtons.args = {
  variant: 'alert-info',
  action: true,
  show: false,
};

export const DefaultSnapshot: Story = Template.bind({});
