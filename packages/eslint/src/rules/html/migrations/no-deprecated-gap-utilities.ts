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
  // '1' → '4' and '4' → '24' form a chain: both must be manual-only so that
  // a user who manually fixes '*-1' → '*-4' doesn't have '*-4' auto-renamed to '*-24'
  new Set(['1', '4']),
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
