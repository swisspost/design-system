import { createClassUpdateRule } from '../../../utils/create-class-update-rule';
import { generateReplacedClassMessages } from '../../../utils/generate-messages';
import { generateReplacedClassMutations } from '../../../utils/generate-mutations';

export const name = 'no-deprecated-position-helpers';

const classesMap = [
  { old: 'fixed-top', new: 'position-fixed top-0 start-0 end-0 z-fixed' },
  { old: 'fixed-bottom', new: 'position-fixed bottom-0 start-0 end-0 z-fixed' },
  { old: 'sticky-top', new: 'position-sticky top-0 z-header' },
  { old: 'sticky-bottom', new: 'position-sticky bottom-0 z-header' },
];

export const data = generateReplacedClassMutations(classesMap);

export default createClassUpdateRule({
  name,
  type: 'problem',
  description:
    'Flags deprecated bootstrap position helpers "fixed-{top|bottom}" and "sticky-{top|bottom}" classes and replace them with a combination of other utility classes.',
  messages: generateReplacedClassMessages(classesMap),
  mutations: data,
});
