import { createClassUpdateRule } from '../../../utils/create-class-update-rule';
import { generateReplacedClassMessages } from '../../../utils/generate-messages';
import { generateReplacedClassMutations } from '../../../utils/generate-mutations';

export const name = 'no-deprecated-shadow-utilities';

const classesMap = [
  { old: 'shadow-none', new: 'elevation-none' },
  { old: 'shadow-sm', new: 'elevation-200' },
  { old: 'shadow', new: 'elevation-400' },
  { old: 'shadow-lg', new: 'elevation-500' },
];

export const data = generateReplacedClassMutations(classesMap);

export default createClassUpdateRule({
  name,
  type: 'problem',
  description:
    'Flags deprecated "shadow" and "shadow-{none|sm|lg}" classes and replace them with equivalent elevation classes.',
  messages: generateReplacedClassMessages(classesMap),
  mutations: data,
});
