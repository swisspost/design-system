import {
  arrayToMap,
  createTwoPhasesRules,
  setUpClassesMutations,
  TwoPhasesData,
} from '../../../utils/two-phases-classes-update';

// Class names
const classNames = ['g-', 'gx-', 'gy-'];

// Previous values mapped to the new values
const classValuesMap: Record<string, number> = {
  '1': 4,
  '2': 8,
  '4': 24,
  '3': 16,
  '5': 48,
};

export const data: TwoPhasesData = setUpClassesMutations(
  arrayToMap(classNames),
  classValuesMap,
  'deprecatedGutterUtilities',
);

export const rules = createTwoPhasesRules(
  data,
  'no-deprecated-gutter-utilities',
  'Flags deprecated bootstrap gutter utility classes and replaces them with final ones with a temporary name (phase 1).',
  'Flags deprecated bootstrap gutter utility classes and replaces the temporary class names with the final ones.',
);
