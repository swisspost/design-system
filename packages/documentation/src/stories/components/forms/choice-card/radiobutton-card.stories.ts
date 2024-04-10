import { choiceCardDefault, choiceCardGroup, choiceCardMeta } from './choice-card';
import { MetaComponent } from '../../../../../types';

const meta: MetaComponent = {
  ...choiceCardMeta,
  title: 'Components/Forms/Radio Button Card',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=24497-16195&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
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
