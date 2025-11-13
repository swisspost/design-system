import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, rule } = createClassUpdateRuleWrapper({
  name: 'no-form-text',
  type: 'problem',
  description: 'Flags deprecated "form-text" class and replaces it with "form-hint".',
  classesMap: [{ old: 'form-text', new: 'form-hint' }],
});

export default rule;
