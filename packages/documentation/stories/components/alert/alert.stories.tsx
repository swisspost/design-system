import React from 'react';
import parse from 'html-react-parser';
import { useArgs } from '@storybook/client-api';
import docsPage from './alert.docs.mdx';

import '@swisspost/design-system-styles/basics.scss';
import '@swisspost/design-system-styles/components/alert.scss';
import '@swisspost/design-system-styles/components/icons.scss';
import './alert.stories.scss';

export default {
  title: 'Components/Alert',
  parameters: {
    docs: {
      page: docsPage
    },
    controls: {
      exclude: [
        'Icon',
        'Icon Color',
        'No Icon',
        'Dismissible',
        'Fixed'
      ]
    }
  },
  args: {
    title: 'Titulum',
    content: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
    variant: 'alert-primary',
    icon: '',
    iconVariant: '',
    noIcon: false,
    dismissible: false,
    dismiss: false,
    fixed: false,
    show: false
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      table: { category: 'Content' }
    },
    content: {
      name: 'Content',
      control: { type: 'text' },
      table: { category: 'Content' }
    },
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        labels: {
          'alert-primary': 'Primary',
          'alert-notification': 'Notification',
          'alert-success': 'Success',
          'alert-danger': 'Danger',
          'alert-error': 'Error',
          'alert-warning': 'Warning',
          'alert-info': 'Info'
        }
      },
      options: [
        'alert-primary',
        'alert-notification',
        'alert-success',
        'alert-danger',
        'alert-error',
        'alert-warning',
        'alert-info'
      ],
      table: { category: 'Variant' }
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
        labels: {
          '': 'Default',
          '1001': '1001 (Envelope)',
          '2023': '2023 (Cog)',
          '2025': '2025 (Send)',
          '2035': '2035 (Home)',
          '2101': '2101 (Bubble)'
        }
      },
      options: [
        '',
        '1001',
        '2023',
        '2025',
        '2035',
        '2101'
      ],
      table: { category: 'Icon' }
    },
    iconVariant: {
      name: 'Icon Color',
      control: {
        type: 'select',
        labels: {
          '': 'Default',
          'white': 'White',
          'primary': 'primary',
          'success': 'success',
          'info': 'info',
          'warning': 'warning',
          'danger': 'danger',
        }
      },
      options: [
        '',
        'white',
        'primary',
        'success',
        'info',
        'warning',
        'danger'
      ],
      if: { arg: 'icon', neq: '' },
      table: { category: 'Icon' }
    },
    noIcon: {
      name: 'No Icon',
      control: {
        type: 'boolean'
      },
      table: { category: 'Icon' }
    },
    dismissible: {
      name: 'Dismissible',
      control: { type: 'boolean' },
      if: { arg: 'fixed', truthy: false },
      table: { category: 'Dismissible' }
    },
    dismiss: {
      name: 'Dismiss',
      control: { type: 'boolean' },
      if: { arg: 'dismissible' },
      table: { category: 'Dismissible' }
    },
    fixed: {
      name: 'Fixed',
      control: { type: 'boolean' },
      if: { arg: 'dismissible', truthy: false },
      table: { category: 'Fixed' }
    },
    show: {
      name: 'Show',
      control: { type: 'boolean' },
      if: { arg: 'fixed' },
      table: { category: 'Fixed' }
    }
  }
};

const Template = args => {
  const [_, updateArgs] = useArgs();
  
  const dismissPropName = args.dismissible ? 'dismiss' : 'show';
  const dismissButton = <button className="btn-close" data-dismiss="alert" aria-label="Close" onClick={ () => updateArgs({ [dismissPropName]: !args[dismissPropName] }) }></button>;
  const toggleButton = <button className="btn btn-secondary" onClick={ () => updateArgs({ show: !args.show }) }>Toggle alert</button>;

  const alertClasses = [
    'alert',
    args.variant,
    `${args.icon ? `pi-${args.icon}${args.iconVariant ? `--${args.iconVariant}` : ''}` : ''}`,
    args.noIcon ? 'no-icon' : '',
    args.dismissible ? 'alert-dismissible' : '',
    args.fixed ? 'alert-fixed-bottom' : ''
  ].filter(c => c).join(' ');

  const alert = <div className={ alertClasses } role="alert">
    { args.dismissible || args.fixed ? dismissButton : null }
    <h4 className="alert-heading">{ args.title }</h4>
    <p>{ parse(args.content) }</p>
  </div>;

  return <div>
    { args.fixed ? toggleButton : null }
    { (args.dismissible && !args.dismiss) || (args.fixed && args.show) || (!args.dismissible && !args.fixed) ? alert : null }
  </div>;
};

export const Variant = Template.bind({});

export const CustomIcon = Template.bind({});
CustomIcon.parameters = {
  controls: {
    exclude: [
      'No Icon',
      'Dismissible',
      'Fixed'
    ]
  }
}
CustomIcon.args = {
  variant: 'alert-danger',
  icon: '2023',
  iconVariant: 'white'
};

export const WithoutIcon = Template.bind({});
WithoutIcon.parameters = {
  controls: {
    exclude: [
      'Dismissible',
      'Fixed'
    ]
  }
}
WithoutIcon.args = {
  variant: 'alert-info',
  noIcon: true
};

export const Content = Template.bind({});
Content.args = { 
  content: `<p>Contentum momentum ipsum tipsum sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
  <ul>
    <li>Un orde redlis titem</li>
    <li>An deven moreun orde redlis titem</li>
    <li>Thel astofu orde redlis titem</li>
  </ul>
<hr />
<p>An deven morecon tentum no sea takimata sanctus est magna aliquyam erat.</p>`,
  variant: 'alert-success'
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  dismissible: true
};

export const Fixed = Template.bind({});
Fixed.args = {
  fixed: true
};
