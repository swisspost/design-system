import { choiceCardDefault, choiceCardGroup, choiceCardMeta } from './choice-card';

export default {
  ...choiceCardMeta,
  id: '9637bbae-0533-4522-89d4-c2732431c69b',
  title: 'Components/Forms/Checkbox Card',
  parameters: {
    badges: [],
  },
};

export const Default = {
  render: choiceCardDefault,
  args: { ...choiceCardMeta.args, type: 'checkbox' },
  parameters: {
    controls: {
      exclude: ['Group Validation'],
    },
  },
};

export const Group = {
  render: choiceCardGroup,
  args: { ...choiceCardMeta.args, type: 'checkbox' },
  parameters: {
    controls: {
      include: ['Group Validation'],
    },
  },
};
