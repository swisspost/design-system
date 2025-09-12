import { createClassUpdateRule } from '../../../utils/create-class-update-rule';

export const name = 'no-deprecated-h-visuallyhidden';
export const messageId = 'deprecatedHVisuallyhidden';

// Type: RuleModule<"uppercase", ...>
export default createClassUpdateRule({
  name,
  type: 'problem',
  description: 'Flags deprecated "h-visuallyhidden" class and replaces it with "visually-hidden".',
  messages: {
    [messageId]:
      'The "h-visuallyhidden" class is deprecated. Please replace it with "visually-hidden".',
  },
  mutations: {
    [messageId]: ['h-visuallyhidden', 'visually-hidden'],
  },
});
