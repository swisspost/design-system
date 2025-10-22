import { createClassUpdateRule } from '../../../utils/create-class-update-rule';
import { generateReplacedClassMessages } from '../../../utils/generate-messages';
import { generateReplacedClassMutations } from '../../../utils/generate-mutations';

export const name = 'no-deprecated-font-curves';

const classesMap = [
  { old: 'font-curve-tiny', new: 'fs-9' },
  { old: 'font-curve-small', new: 'fs-7' },
  { old: 'font-curve-regular', new: 'fs-6' },
  { old: 'font-curve-bigger-regular', new: 'fs-5' },
  { old: 'font-curve-medium', new: 'fs-4' },
  { old: 'font-curve-large', new: 'fs-3' },
  { old: 'font-curve-big', new: 'fs-1' },
];

export const data = generateReplacedClassMutations(classesMap);

export default createClassUpdateRule({
  name,
  type: 'problem',
  description:
    'Flags deprecated "font-curve-{tiny|small|regular|bigger-regular|medium|large|big}" classes and replace them with new font curve classes.',
  messages: generateReplacedClassMessages(classesMap),
  mutations: data,
});
