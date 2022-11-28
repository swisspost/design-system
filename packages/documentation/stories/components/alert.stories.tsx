import React from 'react';
import parse from 'html-react-parser';
import { useArgs } from '@storybook/client-api';
import docsPage from './alert.docs.mdx';

import '@swisspost/design-system-styles/basics.scss';
import '@swisspost/design-system-styles/components/alert.scss';
import '@swisspost/design-system-styles/components/icons.scss';

export default {
  title: 'Components/Alert',
  parameters: {
    docs: {
      page: docsPage
    }
  },
  args: {
    title: 'Titulum',
    content: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
    variant: 'alert-primary',
    icon: '',
    noIcon: false,
    dismissible: false,
    fixed: false,
    buttons: false,
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
          'alert-success': 'Success',
          'alert-danger': 'Danger',
          'alert-warning': 'Warning',
          'alert-info': 'Info'
        }
      },
      options: [
        'alert-primary',
        'alert-success',
        'alert-danger',
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
      table: { category: 'Dismissible' }
    },
    fixed: {
      name: 'Fixed',
      control: { type: 'boolean' },
      table: { category: 'Fixed' }
    },
    buttons: {
      name: 'Buttons',
      control: { type: 'boolean' },
      table: { category: 'Buttons' }
    },
    show: {
      name: 'Show',
      control: { type: 'boolean' }
    }
  }
};

const Template = args => {
  const [_, updateArgs] = useArgs();

  return <div>
    { getToggleButton() }
    { getAlert() }
  </div>;

  function getAlert() {
    const isOnlyDismissibleAndDismissed = !args.fixed && !args.buttons && args.dismissible && args.show;
    const isFixedAndVisible = args.fixed && args.show;
    const isNotDismissibleNorFixed = !args.dismissible && !args.fixed

    const classes = [
      'alert',
      args.variant,
      `${args.icon ? `pi-${args.icon}` : ''}`,
      args.noIcon ? 'no-icon' : '',
      args.dismissible ? 'alert-dismissible' : '',
      args.fixed ? 'alert-fixed-bottom' : '',
      args.buttons ? 'alert-action' : ''
    ].filter(c => c).join(' ');

    return isOnlyDismissibleAndDismissed || isFixedAndVisible || isNotDismissibleNorFixed ? <div className={ classes } role="alert">
      { getDismissButton() }
      { getContent() }
      { getButtons() }
    </div> : getResetButton();
  }

  function getContent () {
    const content = [
      <h4 className="alert-heading">{ args.title }</h4>,
      <p>{ parse(args.content) }</p>
    ];

    return args.buttons ? <div class="alert-content">{ content }</div> : content;
  }

  function getDismissButton () {
    return args.dismissible ? <button className="btn-close" data-dismiss="alert" aria-label="Close" onClick={ toggle }></button> : null;
  }

  function getToggleButton () {
    return args.fixed ? <button className="btn btn-secondary" onClick={ toggle }>Toggle alert</button> : null;
  }

  function getButtons () {
    return args.buttons ? <div className="alert-buttons">
      <button class="btn btn-primary btn-animated" onClick={ toggle }><span>Akcepti</span></button>
      <button class="btn btn-secondary btn-animated" onClick={ toggle }><span>Aborti</span></button>
    </div> : null;
  }

  function getResetButton () {
    return args.dismissible && !args.fixed ? <a href="#" onClick={ toggle }>reset</a> : null;
  }

  function toggle (e) {
    e.preventDefault();
    updateArgs({ show: !args.show });
  }
};

export const Variant = Template.bind({});
Variant.parameters = {
  controls: {
    exclude: [
      'Icon',
      'Icon Color',
      'No Icon',
      'Dismissible',
      'Fixed',
      'Buttons',
      'Show'
    ]
  }
};

export const CustomIcon = Template.bind({});
CustomIcon.parameters = {
  controls: {
    exclude: [
      'Variant',
      'No Icon',
      'Dismissible',
      'Fixed',
      'Buttons',
      'Show'
    ]
  }
};
CustomIcon.args = {
  variant: 'alert-info',
  icon: '2023'
};

export const WithoutIcon = Template.bind({});
WithoutIcon.parameters = {
  controls: {
    exclude: [
      'Variant',
      'Icon',
      'Dismissible',
      'Fixed',
      'Buttons',
      'Show'
    ]
  }
};
WithoutIcon.args = {
  variant: 'alert-info',
  noIcon: true
};

export const Content = Template.bind({});
Content.parameters = {
  controls: {
    exclude: [
      'Variant',
      'Icon',
      'No Icon',
      'Dismissible',
      'Fixed',
      'Buttons',
      'Show'
    ]
  }
};
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
Dismissible.parameters = {
  controls: {
    exclude: [
      'Variant',
      'Icon',
      'No Icon',
      'Fixed',
      'Buttons',
      'Show'
    ]
  }
};
Dismissible.args = {
  dismissible: true,
  show: true
};

export const Fixed = Template.bind({});
Fixed.parameters = {
  controls: {
    exclude: [
      'Variant',
      'Icon',
      'No Icon',
      'Dismissible',
      'Buttons',
      'Show'
    ]
  }
};
Fixed.args = {
  dismissible: true,
  fixed: true
};

export const Buttons = Template.bind({});
Buttons.parameters = {
  controls: {
    exclude: [
      'Variant',
      'Icon',
      'No Icon',
      'Dismissible',
      'Fixed',
      'Show'
    ]
  }
};
Buttons.args = {
  variant: 'alert-info',
  fixed: true,
  buttons: true
};
