import React from 'react';
import { useArgs } from '@storybook/client-api';

import '@swisspost/design-system-styles/basics.scss';
import '@swisspost/design-system-styles/components/badge.scss';

export default {
  title: 'Components/Badge',
  args: {
    label: 'Badge',
    size: '',
    nested: false,
    nestedNumber: 10,
    checkable: false,
    checked: false,
    dismissible: false,
    dismissed: false
  },
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    },
    size: {
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'badge-sm': 'Small'
        }
      },
      options: ['null', 'badge-sm']
    },
    nested: {
      control: {
        type: 'boolean'
      }
    },
    nestedNumber: {
      control: {
        type: 'number'
      },
      if: { arg: 'nested' }
    },
    checkable: {
      control: {
        type: 'boolean'
      },
      if: {
        arg: 'dismissible',
        truthy: false
      }
    },
    checked: {
      control: {
        type: 'boolean'
      },
      if: { arg: 'checkable' }
    },
    dismissible: {
      control: {
        type: 'boolean'
      },
      if: {
        arg: 'checkable',
        truthy: false
      }
    },
    dismissed: {
      control: {
        type: 'boolean'
      },
      if: { arg: 'dismissible' }
    }
  }
};

const Template = (args, story) => {
  const [_, updateArgs] = useArgs();
  let component: JSX.Element;
  const content: React.ReactElement[] = [];
  const size = args.size === 'null' ? '' : args.size;

  if (args.nested) {
    content.push(<span key="1">{ args.label }</span>);
    content.push(<span key="2" className="badge">{ args.nestedNumber }</span>);
  } else {
    content.push(args.label);
  }

  if (args.checkable) {
    const id = `${story.id}-CheckableBadge`;

    component = <div className="badge-check">
      <input id={ id } className="badge-check-input" type="checkbox" checked={ args.checked } onChange={ () => updateArgs({ checked: !args.checked }) }/>
      <label className={ `badge-check-label ${size}` } htmlFor={ id }>
        { content }
      </label>
    </div>
  } else if (args.dismissible) {
    if (args.dismissed) {
      component = <div></div>;
    } else {
      component = <span className={ `badge ${size}` }>
        { content }
        <button className="btn-close" aria-label="dismiss" onClick={ () => { updateArgs({ dismissed: !args.dismissed }); } }></button>
      </span>;
    }
  } else {
    component = <span className={ `badge ${size}` }>
      { content }
    </span>;
  }

  return component;
};

export const Badge = Template.bind({});

export const Checkable = Template.bind({});

Checkable.parameters = {
  controls: {
    exclude: ['checkable', 'dismissible']
  }
};

Checkable.args = {
  label: 'Checkable Badge',
  checkable: true
};

export const Dismissible = Template.bind({});

Dismissible.parameters = {
  controls: {
    exclude: ['checkable', 'dismissible']
  }
};

Dismissible.args = {
  label: 'Dismissible Badge',
  dismissible: true
};
