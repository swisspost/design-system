import { useArgs } from '@storybook/client-api';
import React, { ComponentProps, MouseEventHandler } from 'react';
import { Meta, Story, StoryFn } from '@storybook/react';
import { PostCollapsible } from '@swisspost/design-system-components-react';
import parse from 'html-react-parser';
import docsPage from './collapsible.docs.mdx';
import { definedProperties } from '../../../utils';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

type PostCollapsibleArgs = ComponentProps<typeof PostCollapsible> & { content: string };

export default {
  title: 'Components/Collapsible',
  component: PostCollapsible.displayName,
  parameters: {
    docs: {
      page: docsPage,
    },
    controls: {
      exclude: ['Content'],
    },
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
  },
  args: {
    content: `<span slot="header">Titulum</span><p>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
  },
  argTypes: {
    content: {
      name: 'Content',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
  },
} as Meta<PostCollapsibleArgs>;

const Template: StoryFn<PostCollapsibleArgs> = (args, context) => {
  const hasHeader = args.content.indexOf('slot="header"') > -1;
  const collapsibleId = `collapsible-example--${context.name.replace(/ /g, '-').toLowerCase()}`;

  const collapsibleProperties = definedProperties({
    'collapsed': args.collapsed,
    'heading-level': args['heading-level'],
    'id': hasHeader ? undefined : collapsibleId,
  });

  const collapsibleComponent = (
    <PostCollapsible {...collapsibleProperties}>{parse(args.content)}</PostCollapsible>
  );

  const [currentArgs, updateArgs] = useArgs();

  const toggleCollapse = (open?: boolean) => {
    const collapsible = document.querySelector(`#${collapsibleId}`) as HTMLPostCollapsibleElement;
    collapsible.toggle(open).then((isOpen: boolean) => {
      if (typeof currentArgs.collapsed !== 'undefined') updateArgs({ collapsed: !isOpen });
    });
  };

  const togglers: [string, MouseEventHandler][] = [
    ['Toggle', () => toggleCollapse()],
    ['Show', () => toggleCollapse(true)],
    ['Hide', () => toggleCollapse(false)],
  ];

  if (hasHeader) {
    return collapsibleComponent;
  }

  return (
    <>
      <div className="d-flex gap-mini mb-regular">
        {togglers.map(([label, listener]) => (
          <button
            aria-controls={collapsibleId}
            aria-expanded={!args.collapsed}
            className="btn btn-secondary"
            onClick={listener}
            key={label}
          >
            {label}
          </button>
        ))}
      </div>
      {collapsibleComponent}
    </>
  );
};

export const Default: Story<PostCollapsibleArgs> = Template.bind({});

export const InitiallyCollapsed: Story<PostCollapsibleArgs> = Template.bind({});
InitiallyCollapsed.parameters = {
  controls: {
    exclude: ['Content', 'heading-level', 'toggle'],
  },
};
InitiallyCollapsed.args = {
  collapsed: true,
};

export const HeadingLevel: Story<PostCollapsibleArgs> = Template.bind({});
HeadingLevel.parameters = {
  controls: {
    exclude: ['Content', 'collapsed', 'toggle'],
  },
};
HeadingLevel.args = {
  headingLevel: 6,
};

export const IntricateContent: Story<PostCollapsibleArgs> = Template.bind({});
IntricateContent.parameters = {
  controls: {
    exclude: ['collapsed', 'heading-level', 'toggle'],
  },
};
IntricateContent.args = {
  content: `<p>I am part of the body</p>
<span slot="header">Customus<em>&nbsp;Titulum</em></span>
<small slot="header" class="text-muted">&nbsp;- I am part of the header</small>
<p>I am part of the body too!</p>`,
};

export const CustomTrigger: Story<PostCollapsibleArgs> = Template.bind({});
CustomTrigger.parameters = {
  controls: {
    exclude: ['Content', 'collapsed', 'heading-level'],
  },
};
CustomTrigger.args = {
  content: `<p class="border rounded p-large">Contentus momentus vero siteos et accusam iretea et justo.</p>`,
};
