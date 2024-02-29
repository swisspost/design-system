import { choiceCardMeta, choiceCardDefault, choiceCardGroup } from './choice-card';

export default {
  ...choiceCardMeta,
  title: 'Components/Forms/Radio Button Card',
  parameters: {
    badges: [],
  },
};

export const Default = {
  render: choiceCardDefault,
  args: { ...choiceCardMeta.args, type: 'radio' },
  parameters: {
    controls: {
      exclude: ['Group Validation'],
    },
  },
};

export const Group = {
  render: choiceCardGroup,
  args: { ...choiceCardMeta.args, type: 'radio' },
  parameters: { controls: { include: ['Group Validation'] } },
};
