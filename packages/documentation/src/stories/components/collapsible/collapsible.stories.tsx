import { useArgs } from '@storybook/client-api';
import React from 'react';
import { Story, Args, StoryContext, ReactFramework } from '@storybook/react';
import { PostCollapsible } from '@swisspost/design-system-components-react';
import parse from 'html-react-parser';
import { definedProperties } from '../../../utils';
import docsPage from './collapsible.docs.mdx';

export default {
  title: 'Components/Collapsible',
  component: PostCollapsible.displayName,
  parameters: {
    docs: {
      page: docsPage,
    },
    controls: {
      exclude: [
        'Content',
      ],
    },
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
};

const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const hasHeader = args.content.indexOf('slot="header"') > -1;
  const collapsibleId = `collapsible-example--${context.name.replace(/ /g, '-').toLowerCase()}`;

  const collapsibleProperties = definedProperties({
    collapsed: args.collapsed,
    headingLevel: args.headingLevel,
    id: hasHeader ? undefined : collapsibleId,
  });

  const collapsibleComponent = <PostCollapsible
    { ...collapsibleProperties }
  >
    { parse(args.content) }
  </PostCollapsible>;

  const [currentArgs, updateArgs] = useArgs();
  const triggerCollapse = () => {
    const collapsible = document.querySelector(`#${collapsibleId}`) as HTMLPostCollapsibleElement;
    collapsible.toggle().then((isOpen: boolean) => {
      if (typeof currentArgs.collapsed !== 'undefined') updateArgs({ collapsed: !isOpen });
    });
  };

  const toggleButton = <button
    aria-controls={ collapsibleId }
    aria-expanded={ !args.collapsed }
    className="btn btn-secondary mb-regular"
    onClick={ triggerCollapse }
  >Toggle element</button>;

  if (hasHeader) {
    return collapsibleComponent;
  }

  return <>
    { toggleButton }
    { collapsibleComponent }
  </>;
};

export const Default: Story = Template.bind({});

export const InitiallyCollapsed: Story = Template.bind({});
InitiallyCollapsed.parameters = {
  controls: {
    exclude: [
      'Content',
      'heading-level',
      'toggle',
    ],
  },
};
InitiallyCollapsed.args = {
  collapsed: true,
};

export const HeadingLevel: Story = Template.bind({});
HeadingLevel.parameters = {
  controls: {
    exclude: [
      'Content',
      'collapsed',
      'toggle',
    ],
  },
};
HeadingLevel.args = {
  headingLevel: 6,
};

export const IntricateContent: Story = Template.bind({});
IntricateContent.parameters = {
  controls: {
    exclude: [
      'collapsed',
      'heading-level',
      'toggle',
    ],
  },
};
IntricateContent.args = {
  content: `<p>I am part of the body</p>
<span slot="header">Customus<em>&nbsp;Titulum</em></span>
<small slot="header" class="text-muted">&nbsp;- I am part of the header</small>
<p>I am part of the body too!</p>`,
};

export const CustomTrigger: Story = Template.bind({});
CustomTrigger.parameters = {
  controls: {
    exclude: [
      'Content',
      'collapsed',
      'heading-level',
    ],
  },
};
CustomTrigger.args = {
  content: `<p class="border rounded p-large">Contentus momentus vero siteos et accusam iretea et justo.</p>`,
};
