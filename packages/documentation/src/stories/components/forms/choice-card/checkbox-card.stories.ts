import { choiceCardDefault, choiceCardGroup, choiceCardMeta } from './choice-card';
import { MetaComponent } from '../../../../../types';

const meta: MetaComponent = {
  ...choiceCardMeta,
  id: '9637bbae-0533-4522-89d4-c2732431c69b',
  title: 'Components/Forms/Checkbox Card',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=22630-6854&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
};

export default meta;

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
