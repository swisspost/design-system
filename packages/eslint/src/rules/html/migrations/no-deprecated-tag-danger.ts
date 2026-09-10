import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const messageId = 'deprecatedTagDanger';

export const { name, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-tag-danger',
  type: 'problem',
  description: 'Flags deprecated "tag-danger" class and replaces it with "tag-error".',
  classesMap: [{ old: 'tag-danger', new: 'tag-error' }],
});

export default rule;
