import { createClassUpdateRule } from '../../../utils/create-class-update-rule';

export const name = 'no-deprecated-h-clearfix';
export const messageId = 'deprecatedHClearfix';

// Type: RuleModule<"uppercase", ...>
export default createClassUpdateRule({
  name,
  type: 'problem',
  description: 'Flags deprecated "h-clearfix" class and replaces it with "clearfix".',
  messages: {
    [messageId]: 'The "h-clearfix" class is deprecated. Please replace it with "clearfix".',
  },
  mutations: {
    [messageId]: ['h-clearfix', 'clearfix'],
  },
});
