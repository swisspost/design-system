import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-h-clearfix',
  type: 'problem',
  description: 'Flags deprecated "h-clearfix" class and replaces it with "clearfix".',
  classesMap: [{ old: 'h-clearfix', new: 'clearfix' }],
});

export default rule;
