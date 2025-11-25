import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, data, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-font-curves',
  type: 'problem',
  description:
    'Flags deprecated "font-curve-{tiny|small|regular|bigger-regular|medium|large|big}" classes and replace them with new font curve classes.',
  classesMap: [
    { old: 'font-curve-tiny', new: 'fs-9' },
    { old: 'font-curve-small', new: 'fs-7' },
    { old: 'font-curve-regular', new: 'fs-6' },
    { old: 'font-curve-bigger-regular', new: 'fs-5' },
    { old: 'font-curve-medium', new: 'fs-4' },
    { old: 'font-curve-large', new: 'fs-3' },
    { old: 'font-curve-big', new: 'fs-1' },
  ],
});

export default rule;
