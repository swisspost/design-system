import React from 'react';
import { Story, Args } from '@storybook/react';
import { PostCollapsible } from '@swisspost/design-system-components-react';
import parse from 'html-react-parser';
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
    content: `<span slot="header">Titulum</span>Contentus momentus vero siteos et accusam iretea et justo.`,
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

const Template = (args: Args) => {
  const hasHeader = args.content.indexOf('slot="header"') > -1;
  const collapsibleId = 'collapsibleExample';

  const collapsibleComponent = <PostCollapsible
    collapsed={ args.collapsed }
    headingLevel={ args.headingLevel }
    id={ hasHeader ? undefined : collapsibleId }
  >
    { parse(args.content) }
  </PostCollapsible>;

  if (hasHeader) {
    return collapsibleComponent;
  }

  let isCollapsed = args.collapsed;

  const triggerCollapse = (e: React.MouseEvent) => {
    e.preventDefault();
    const collapsible = document.querySelector(`#${collapsibleId}`) as any;
    collapsible.toggle().then(() => isCollapsed = !isCollapsed);
  };

  const toggleButton = <button
    aria-controls={ collapsibleId }
    aria-expanded={ !isCollapsed }
    className="btn btn-secondary mb-regular"
    onClick={ triggerCollapse }
  >Toggle element</button>;

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
      'Content', 'collapsed', 'toggle',
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
      'collapsed', 'heading-level', 'toggle',
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
      'heading-level',
    ],
  },
};
CustomTrigger.args = {
  content: `<p class="border rounded p-large">Contentus momentus vero siteos et accusam iretea et justo.</p>`,
};
