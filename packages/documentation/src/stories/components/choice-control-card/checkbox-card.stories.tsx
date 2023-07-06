import { Meta, Story } from '@storybook/react';
import { choiceCardGroup, choiceCardMeta, ChoiceCardReactiveTemplate } from './choice-card';
import docsPage from './checkbox-card.docs.mdx';

export default Object.assign({}, choiceCardMeta, {
  title: 'Components/Checkbox card',
  parameters: { ...choiceCardMeta.parameters, docs: { page: docsPage } },
  args: { ...choiceCardMeta.args, type: 'checkbox' },
}) as Meta;

export const Default: Story = ChoiceCardReactiveTemplate.bind({});
Default.args = {
  type: 'checkbox',
};
Default.parameters = {
  controls: {
    exclude: ['Type'],
  },
};

export const Group: Story = choiceCardGroup.bind({});
Group.args = {
  type: 'checkbox',
};
Group.parameters = {
  controls: {
    exclude: ['Checked', 'Disabled', 'Type', 'Label'],
  },
};
