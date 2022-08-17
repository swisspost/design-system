export default {
  title: 'Components/my-component',
  component: 'my-component',
  parameters: {
    actions: {
      handles: ['someevent'],
    },
  },
};

const defaultArgs = {
  first: 'first',
  last: 'last',
  middle: 'middle',
};

const Template = ({ first, last, middle }) =>
  `<my-component first="${first}" middle="${middle}" last="${last}"></my-component>`;

export const MyComponent = Template.bind({});
MyComponent.args = { ...defaultArgs };

export const Precomposed = Template.bind({});
Precomposed.args = { first: 'some', middle: 'value', last: 'precomposed' };
