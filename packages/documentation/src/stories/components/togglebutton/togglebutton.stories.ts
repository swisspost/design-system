import { type Args, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import buttonMeta from '../button/button.stories';

export interface PostTogglebuttonProps {
  toggled?: boolean;
  variant?: string;
  size?: string;
  contentWhenToggled?: string;
  contentWhenUntoggled?: string;
}

const meta: MetaComponent<PostTogglebuttonProps> = {
  id: '1a6f47c2-5e8a-45a0-b1c3-9f7e2b834c24',
  title: 'Components/Button Toggle',
  tags: ['package:WebComponents'],
  render: renderBadge,
  component: 'post-togglebutton',
  parameters: {
    design: {},
  },
  args: {
    contentWhenToggled: 'Toggled',
    contentWhenUntoggled: 'Untoggled',
    variant: 'btn-primary',
    size: 'null',
    toggled: false,
  },
  argTypes: {
    contentWhenToggled: {
      name: 'Toggled text',
      description: "Text within the button when it's toggled.",
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    contentWhenUntoggled: {
      name: 'Untoggled text',
      description: "Text within the button when it's untoggled.",
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    size: {
      ...buttonMeta.argTypes?.size,
      description:
        'Sets the size of the component.' +
        '<span className="mt-8 banner banner-info banner-sm">' +
        'For more options, please see the ' +
        '<a href="/?path=/docs/eb78afcb-ce92-4990-94b6-6536d5ec6af4--docs">button documentation</a>' +
        '.</span>',
    },
    variant: {
      ...buttonMeta.argTypes?.variant,
      description:
        'Defines a style variant.' +
        '<span className="mt-8 banner banner-info banner-sm">' +
        'For more options, please see the ' +
        '<a href="/?path=/docs/eb78afcb-ce92-4990-94b6-6536d5ec6af4--docs">button documentation</a>' +
        '.</span>',
    },
  },
};

export default meta;

function renderBadge(args: Args) {
  const btnClasses = ['btn', args.variant, args.size].filter(c => c && c !== 'null').join(' ');
  return html`
    <post-togglebutton class=${btnClasses} toggled=${args.toggled || nothing}>
      <span data-showwhen="untoggled">${args.contentWhenUntoggled}</span>
      <span data-showwhen="toggled">${args.contentWhenToggled}</span>
    </post-togglebutton>
  `;
}

export const Default: StoryObj<PostTogglebuttonProps> = {};

export const InitiallyToggled: StoryObj<PostTogglebuttonProps> = {
  args: {
    toggled: true,
  },
};

export const ContentVisibility: StoryObj<PostTogglebuttonProps> = {
  render: () => {
    return html`
      <post-togglebutton class="btn btn-primary">
        Menu
        <span data-showwhen="untoggled"><post-icon name="2070"></post-icon></span>
        <span data-showwhen="toggled"><post-icon name="2043"></post-icon></span>
      </post-togglebutton>
    `;
  },
};
