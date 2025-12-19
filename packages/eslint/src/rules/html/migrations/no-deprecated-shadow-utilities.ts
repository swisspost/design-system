import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, data, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-shadow-utilities',
  type: 'problem',
  description:
    'Flags deprecated "shadow" and "shadow-{none|sm|lg}" classes and replace them with equivalent elevation classes.',
  classesMap: [
    { old: 'shadow-none', new: 'elevation-none' },
    { old: 'shadow-sm', new: 'elevation-200' },
    { old: 'shadow', new: 'elevation-400' },
    { old: 'shadow-lg', new: 'elevation-500' },
  ],
});

export default rule;
