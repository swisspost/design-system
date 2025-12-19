import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const messageId = 'deprecatedChipFilter';

export const { name, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-chip-filter',
  type: 'problem',
  description: 'Flags deprecated "chip-filter" class and replaces it with "chip-selectable".',
  classesMap: [{ old: 'chip-filter', new: 'chip-selectable' }],
});

export default rule;
