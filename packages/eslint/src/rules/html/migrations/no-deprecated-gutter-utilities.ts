import { bootstrapSizeMap } from '../../../utils/common-data';
import {
  arrayToMap,
  createTwoPhasesClassUpdateRule,
  setUpClassesMutations,
  TwoPhasesData,
} from '../../../utils/two-phases-classes-update';

// Class names
const classNames = ['g-', 'gx-', 'gy-'];

export const data: TwoPhasesData = setUpClassesMutations(
  arrayToMap(classNames),
  bootstrapSizeMap,
  'deprecatedGutterUtilities',
);

export const rules = createTwoPhasesClassUpdateRule({
  name: 'no-deprecated-gutter-utilities',
  phases: [
    {
      ...data.phases[0],
      description:
        'Flags deprecated bootstrap gutter utility classes and replaces them with final ones with a temporary name (phase 1).',
    },
    {
      ...data.phases[1],
      description:
        'Flags deprecated bootstrap gutter utility classes and replaces the temporary class names with the final ones.',
    },
  ],
});
