import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, data, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-font-weights',
  type: 'problem',
  description: 'Flags deprecated "h-visuallyhidden" class and replaces it with "visually-hidden".',
  classesMap: [
    { old: 'regular', new: 'fw-regular' },
    { old: 'bold', new: 'fw-bold' },
  ],
});

export default rule;
