import { bootstrapSizeMap } from '../../../utils/common-data';
import {
  arrayToMap,
  createTwoPhasesClassUpdateRule,
  setUpClassesMutations,
  TwoPhasesData,
} from '../../../utils/two-phases-classes-update';

// Class names
const classNames = [
  'm-',
  'mx-',
  'my-',
  'mt-',
  'mb-',
  'ms-',
  'me-',
  'p-',
  'px-',
  'py-',
  'pt-',
  'pb-',
  'ps-',
  'pe-',
];

// Previous values mapped to the new values
const classValuesMap: Record<string, number> = {
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
  'bigger-giant': 80,
};

export const data: TwoPhasesData = setUpClassesMutations(
  arrayToMap(classNames),
  classValuesMap,
  'deprecatedSpacingUtilities',
);

export const rules = createTwoPhasesClassUpdateRule({
  name: 'no-deprecated-spacing-utilities',
  phases: [
    {
      ...data.phases[0],
      description:
        'Flags deprecated named and numbered spacing utility classes and replaces them with pixel ones with a temporary name (phase 1).',
    },
    {
      ...data.phases[1],
      description:
        'Flags deprecated named and numbered spacing utility classes and replaces the temporary class names with the final ones.',
    },
  ],
});
