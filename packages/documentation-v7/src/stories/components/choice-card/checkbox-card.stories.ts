import { BADGE } from '../../../../.storybook/constants';
import { choiceCardMeta, choiceCardDefault, choiceCardGroup } from './choice-control';

export default {
  ...choiceCardMeta,
  title: 'Components/Checkbox Card',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export const Default = {
  render: choiceCardDefault,
  args: { ...choiceCardMeta.args, type: 'checkbox' },
};

export const Group = {
  render: choiceCardGroup,
  args: { ...choiceCardMeta.args, type: 'checkbox' },
};
