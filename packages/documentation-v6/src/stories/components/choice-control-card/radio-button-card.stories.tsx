import { Story } from '@storybook/react';
import { choiceCardGroup, choiceCardMeta, ChoiceCardReactiveTemplate } from './choice-card';
import docsPage from './radio-button-card.docs.mdx';

export default Object.assign({}, choiceCardMeta, {
  title: 'Components/Radio Button Card',
  parameters: { ...choiceCardMeta.parameters, docs: { page: docsPage } },
});

export const Default: Story = ChoiceCardReactiveTemplate.bind({});
Default.args = {
  type: 'radio',
};
Default.parameters = {
  controls: {
    exclude: ['Type'],
  },
};

export const Group: Story = choiceCardGroup.bind({});
Group.args = {
  type: 'radio',
};
Group.parameters = {
  controls: {
    exclude: ['Checked', 'Disabled', 'Type', 'Label'],
  },
};
