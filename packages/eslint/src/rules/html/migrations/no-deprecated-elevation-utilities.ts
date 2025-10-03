import { createClassUpdateRule } from '../../../utils/create-class-update-rule';
import { generateReplacedClassMessages } from '../../../utils/generate-messages';
import { generateReplacedClassMutations } from '../../../utils/generate-mutations';

export const name = 'no-deprecated-elevation-utilities';

const classesMap = [
  { old: 'elevation-1', new: 'elevation-100' },
  { old: 'elevation-2', new: 'elevation-200' },
  { old: 'elevation-3', new: 'elevation-300' },
  { old: 'elevation-4', new: 'elevation-400' },
  { old: 'elevation-5', new: 'elevation-500' },
];

export const data = generateReplacedClassMutations(classesMap);

export default createClassUpdateRule({
  name,
  type: 'problem',
  description:
    'Flags deprecated "elevation-{1|2|3|4|5}" classes and replaces them with "elevation-{100|200|300|400|500}".',
  messages: generateReplacedClassMessages(classesMap),
  mutations: data,
});
