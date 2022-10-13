import { PROP_TAG, PROP_TYPE, PROP_HREF, PROP_TARGET, PROP_VARIANT, PROP_SIZE, PROP_ACTIVE, PROP_DISABLED, PROP_ICON, PROP_ICONEND, PROP_ANIMATED, PROP_BLOCK } from './constants'
import { formatPropValueList } from '../../utils/utils';

export default {
  title: 'Components/button',
  component: 'post-button',
  args: {
    text: 'Button',
    tag: PROP_TAG.default,
    type: PROP_TYPE.default,
    href: PROP_HREF.default,
    target: PROP_TARGET.default,
    variant: PROP_VARIANT.default,
    size: PROP_SIZE.default,
    icon: PROP_ICON.default ?? '',
    iconend: PROP_ICONEND.default,
    animated: PROP_ANIMATED.default,
    active: PROP_ACTIVE.default,
    disabled: PROP_DISABLED.default,
    block: PROP_BLOCK.default
  },
  argTypes: {
    text: {
      name: 'Text',
      description: `Defines the components text.<hr><code>string</code>`,
      table: {
        category: 'Basic'
      },
      control: {
        type: 'text'
      }
    },
    tag: {
      name: 'Tag',
      description: `Defines the <strong>HTML tag</strong> to render instead of the default tag. Can be one of ${formatPropValueList(PROP_TAG.values)}.<hr>`,
      table: {
        category: 'Basic'
      },
      control: {
        type: 'select'
      },
      options: PROP_TAG.values,
      defaultValue: PROP_TAG.default
    },
    type: {
      name: 'Type',
      description: `The value to set the button\'s <strong>type attribute</strong> to. Can be one of ${formatPropValueList(PROP_TYPE.values)}.<hr>`,
      if: {
        arg: 'tag',
        neq: 'a'
      },
      table: {
        category: 'Button or Input'
      },
      control: {
        type: 'select'
      },
      options: PROP_TYPE.values
    },
    href: {
      name: 'Href',
      description: 'Defines the link\'s <strong>href attribute</strong>.<hr>',
      if: {
        arg: 'tag',
        eq: 'a'
      },
      table: {
        category: 'Link'
      },
      control: {
        type: 'text'
      }
    },
    target: {
      name: 'Target',
      description: `Defines the <strong>target attribute</strong> on the rendered link. Can be one of ${formatPropValueList(PROP_TARGET.values)}.<hr>`,
      if: {
        arg: 'tag',
        eq: 'a'
      },
      table: {
        category: 'Link'
      },
      control: {
        type: 'select',
      },
      options: PROP_TARGET.values
    },
    variant: {
      name: 'Variant',
      description: `Applies one of the <strong>button colors</strong> to the component. Can be one of ${formatPropValueList(PROP_VARIANT.values)}.<hr>`,
      table: {
        category: 'Basic'
      },
      control: {
        type: 'select'
      },
      options: PROP_VARIANT.values
    },
    size: {
      name: 'Size',
      description: `Applies one of the <strong>button sizes</strong> to the component. Can be one of ${formatPropValueList(PROP_SIZE.values)}.<hr>`,
      table: {
        category: 'Basic'
      },
      control: {
        type: 'select'
      },
      options: PROP_SIZE.values
    },
    active: {
      name: 'Active',
      description: 'When set to true, adds <strong>class active</strong> to the component.<hr>',
      table: {
        category: 'Basic'
      }
    },
    disabled: {
      name: 'Disabled',
      description: 'When set to true, <strong>disables the component\'s functionality</strong> and places it in a disabled state.<hr>',
      table: {
        category: 'Basic'
      }
    },
    icon: {
      name: 'Icon',
      description: 'Applies one of the <strong>Post Icons</strong> to the component.<br>See <a href="https://www.experience-hub.ch/document/2753" target="_blank" rel="noopener">Icons</a>.<hr>',
      if: {
        arg: 'animated',
        truthy: false
      },
      table: {
        category: 'Basic'
      },
      control: {
        type: 'text'
      }
    },
    iconend: {
      name: 'Iconend',
      description: 'Applies the Icon after the text.<hr>',
      if: {
        arg: 'animated',
        truthy: false
      },
      table: {
        category: 'Basic'
      }
    },
    animated: {
      name: 'Animated',
      description: 'When set to true, buttons interactions are <strong>animated</strong>.<hr>',
      if: {
        arg: 'icon',
        eq: ''
      },
      table: {
        category: 'Basic'
      }
    },
    block: {
      name: 'Block',
      description: 'When set to true, renders a <strong>100% width button</strong> (expands to the width of its parent container).<hr>',
      table: {
        category: 'Basic'
      }
    }
  }
};

const Template = (args) => `<post-button
    ${args.tag ? `tag="${args.tag}"` : ''}
    ${args.type ? `type="${args.type}"` : ''}
    ${args.href ? `href="${args.href}"` : ''}
    ${args.target ? `target="${args.target}"` : ''}
    ${args.variant ? `variant="${args.variant}"` : ''}
    ${args.size ? `size="${args.size}"` : ''}
    ${args.active ? `active="${args.active}"` : ''}
    ${args.disabled ? `disabled="${args.disabled}"` : ''}
    ${args.icon ? `icon="${args.icon}"` : ''}
    ${args.iconend ? `iconend="${args.iconend}"` : ''}
    ${args.animated ? `animated="${args.animated}"` : ''}
    ${args.block ? `block="${args.block}"` : ''}
  >${args.text}</post-button>`;

export const DefaultButton = Template.bind({});
