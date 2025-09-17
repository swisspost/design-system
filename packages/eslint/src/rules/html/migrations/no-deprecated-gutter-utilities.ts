import { createClassUpdateRule } from '../../../utils/create-class-update-rule';
import {
  arrayToMap,
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

export const namePhase1 = 'no-deprecated-gutter-utilities-phase-1';
export const namePhase2 = 'no-deprecated-gutter-utilities-phase-2';

export const rulePhase1 = createClassUpdateRule({
  name: namePhase1,
  type: 'problem',
  description:
    'Flags deprecated bootstrap gutter utility classes and replaces them with final ones with a temporary name (phase 1).',
  messages: data.messagesPhase1,
  mutations: data.mutationsPhase1,
});

export const rulePhase2 = createClassUpdateRule({
  name: namePhase2,
  type: 'problem',
  description:
    'Flags deprecated bootstrap gutter utility classes and replaces the temporary class names with the final ones.',
  messages: data.messagesPhase2,
  mutations: data.mutationsPhase2,
});
