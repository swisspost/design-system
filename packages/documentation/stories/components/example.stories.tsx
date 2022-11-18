import React from 'react';

// import custom files
import '../../../styles/src/basics.scss';
// import '../../../styles/src/components/example.scss';

// define component config
export default {
  title: 'Components/Example',
  parameters: {
    layout: 'centered',
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
export const Default = Template.bind({});

// define other story
export const Falsy = Template.bind({});

// override component parameters, args, argTypes for specific story
Falsy.args = {
  state: false
};
