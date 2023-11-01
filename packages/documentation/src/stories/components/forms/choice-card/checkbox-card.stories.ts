import { BADGE } from '../../../../../.storybook/constants';
import { choiceCardMeta, choiceCardDefault, choiceCardGroup } from './choice-card';

export default {
  ...choiceCardMeta,
  title: 'Components/Forms/Checkbox Card',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
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
