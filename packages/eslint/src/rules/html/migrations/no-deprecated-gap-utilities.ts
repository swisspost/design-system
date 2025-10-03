import { bootstrapSizeMap } from '../../../utils/common-data';
import {
  arrayToMap,
  createTwoPhasesClassUpdateRule,
  setUpClassesMutations,
  TwoPhasesData,
} from '../../../utils/two-phases-classes-update';

// Class names
const classNames = ['gap-', 'column-gap-', 'row-gap-'];

export const data: TwoPhasesData = setUpClassesMutations(
  arrayToMap(classNames),
  bootstrapSizeMap,
  'deprecatedGapUtilities',
);

export const rules = createTwoPhasesClassUpdateRule({
  name: 'no-deprecated-gap-utilities',
  phases: [
    {
      ...data.phases[0],
      description:
        'Flags deprecated bootstrap gap utility classes and replaces them with final ones with a temporary name (phase 1).',
    },
    {
      ...data.phases[1],
      description:
        'Flags deprecated bootstrap gap utility classes and replaces the temporary class names with the final ones.',
    },
  ],
});
