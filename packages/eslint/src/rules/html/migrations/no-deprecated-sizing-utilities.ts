import { bootstrapSizeMap } from '../../../utils/common-data';
import {
  createTwoPhasesClassUpdateRule,
  setUpClassesMutations,
  TwoPhasesData,
} from '../../../utils/two-phases-classes-update';

// Class names
const classNamesMap: Record<string, string> = {
  'w-': 'w-',
  'mw-': 'max-w-',
  'h-': 'w-',
  'mh-': 'max-h-',
};

// Previous values mapped to the new values
const classValuesMap: Record<string, string | number> = {
  ...bootstrapSizeMap,
  'hair': 1,
  'line': 2,
  'micro': 4,
  'mini': 8,
  'small-regular': 12,
  'regular': 16,
  'small-large': 24,
  'large': 24,
  'big': 32,
  'bigger-big': 40,
  'small-huge': 48,
  'huge': 56,
  'small-giant': 78,
  'giant': 80,
  '25': 'quarter',
  '50': 'half',
  '75': 'three-quarters',
  '100': 'full',
};

export const data: TwoPhasesData = setUpClassesMutations(
  classNamesMap,
  classValuesMap,
  'deprecatedSizingUtilities',
);

export const rules = createTwoPhasesClassUpdateRule({
  name: 'no-deprecated-sizing-utilities',
  phases: [
    {
      ...data.phases[0],
      description:
        'Flags deprecated sizing utility classes and replaces them with the new ones with a temporary name (phase 1).',
    },
    {
      ...data.phases[1],
      description:
        'Flags deprecated sizing utility classes and replaces the temporary class names with the final ones.',
    },
  ],
});
