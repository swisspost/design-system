import React from 'react';

// import a custom docs page
import docsPage from './example.docs.mdx';

// import custom files
import '@swisspost/design-system-styles/basics.scss';
// import '@swisspost/design-system-styles/components/example.scss';

// define component config
export default {
  title: 'Components/Example',
  parameters: {
    layout: 'centered',
    docs: {
      page: docsPage
    }
  },
  args: {
    state: true
  },
  argTypes: {
    state: {
      name: 'State',
      description: 'Example argument.',
      control: {
        type: 'boolean'
      }
    }
  }
};

// define template
const Template = (args, story) => <div data-story-id={story.id} class="border-primary">{args.state.toString()}</div>;

// define story
export const Example = Template.bind({});

// define other story
export const Falsy = Template.bind({});

// override component parameters, args, argTypes for specific story
Falsy.args = {
  state: false
};
