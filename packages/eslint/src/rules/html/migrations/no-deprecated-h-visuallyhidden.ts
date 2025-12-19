import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-h-visuallyhidden',
  type: 'problem',
  description: 'Flags deprecated "h-visuallyhidden" class and replaces it with "visually-hidden".',
  classesMap: [{ old: 'h-visuallyhidden', new: 'visually-hidden' }],
});

export default rule;
