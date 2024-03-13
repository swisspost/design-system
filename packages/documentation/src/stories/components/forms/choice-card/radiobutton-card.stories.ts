import { choiceCardDefault, choiceCardGroup, choiceCardMeta } from './choice-card';
import { MetaComponent } from '../../../../../types';

const meta: MetaComponent = {
  ...choiceCardMeta,
  title: 'Components/Forms/Radio Button Card',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
  },
};

export default meta;

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
