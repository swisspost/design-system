import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-btn-rg',
  type: 'suggestion',
  description: 'Flags deprecated "btn-rg" class and suggests removal or replacement with "btn-sm".',
  classesMap: [{ old: 'btn-rg', new: 'btn-sm' }],
});

export default rule;
