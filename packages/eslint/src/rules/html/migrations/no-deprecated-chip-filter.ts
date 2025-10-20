import { createClassUpdateRule } from '../../../utils/create-class-update-rule';

export const name = 'no-deprecated-chip-filter';
export const messageId = 'deprecatedChipFilter';

// Type: RuleModule<"uppercase", ...>
export default createClassUpdateRule({
  name,
  type: 'problem',
  description: 'Flags deprecated "chip-filter" class and replaces it with "chip-selectable".',
  messages: {
    [messageId]: 'The "chip-filter" class is deprecated. Please replace it with "chip-selectable".',
  },
  mutations: {
    [messageId]: ['chip-filter', 'chip-selectable'],
  },
});
