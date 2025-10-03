import { createClassUpdateRule, PhaseConfig, RuleConfigBase } from './create-class-update-rule';

type RuleMessages = Record<string, string>;

interface TwoPhaseRuleConfig<T, U> extends RuleConfigBase {
  phases: [PhaseConfig<T>, PhaseConfig<U>];
}

export interface TwoPhasesData {
  phases: [PhaseConfig<Record<string, string>>, PhaseConfig<Record<string, string>>];
}

// Empty string means no breakpoint
const breakpoints = ['sm-', 'md-', 'lg-', 'xl-', ''];

export function arrayToMap(array: Array<string | number>): Record<string, string | number> {
  return array.reduce((obj, val: string | number) => {
    obj[val.toString()] = val;
    return obj;
  }, {} as Record<string, string | number>);
}

/**
 * Since some classes are identical between before and after the migration but with different values,
 * we have to do the migration in two phase:
 * - First, migrate all `oldClassName` classes to `_tmp-newClassName`
 * - Second, migrate all `_tmp-newClassName` to `newClassName`
 *
 * This ensures that we don't get any deprecation errors when running the tests on those identical classes
 */
export function setUpClassesMutations(
  classNamesMap: Record<string, string | number>,
  classValuesMap: Record<string, string | number>,
  messageId: string,
): TwoPhasesData {
  const messagesPhase1: Record<string, string> = {};
  const mutationsPhase1: Record<string, [string, string]> = {};
  const messagesPhase2: Record<string, string> = {};
  const mutationsPhase2: Record<string, [string, string]> = {};

  let index = 0;

  // Temporary prefix to differenciate old and new class names
  const tempPrefix = '_tmp-';

  // Generate all the possible classes based on the class names, breakpoint and class values
  for (const className in classNamesMap) {
    for (const bp of breakpoints) {
      for (const classValue in classValuesMap) {
        const oldClass = className + bp + classValue;
        const finalNewClass = classNamesMap[className] + bp + classValuesMap[classValue];

        // Add the index to the tempClass to avoid issues with having the wrong error msg when running tests
        const tempClass = tempPrefix + index + finalNewClass;

        const keyPhase1 = `${messageId}Phase1_${index}`;

        messagesPhase1[
          keyPhase1
        ] = `The "${oldClass}" class is deprecated. Please replace it with "${finalNewClass}".`;
        // Mutate from `oldClass` to `_tmp-newClass`
        mutationsPhase1[keyPhase1] = [oldClass, tempClass];

        const keyPhase2 = `${messageId}Phase2_${index}`;

        messagesPhase2[
          keyPhase2
        ] = `The "${oldClass}" class is deprecated. Please replace it with "${finalNewClass}".`;
        // Mutate from `_tmp-newClass` to `newClass`
        mutationsPhase2[keyPhase2] = [tempClass, finalNewClass];

        index++;
      }
    }
  }
  return {
    phases: [
      {
        description: '',
        messages: messagesPhase1,
        mutations: mutationsPhase1,
      },
      {
        description: '',
        messages: messagesPhase2,
        mutations: mutationsPhase2,
      },
    ],
  };
}

export const createTwoPhasesClassUpdateRule = <T extends RuleMessages, U extends RuleMessages>(
  config: TwoPhaseRuleConfig<T, U>,
) => {
  const makePhaseRule = (phaseIndex: 0 | 1) => {
    const phase = config.phases[phaseIndex];
    return createClassUpdateRule({
      name: `${config.name}-phase-${phaseIndex + 1}`,
      type: config.type || 'problem',
      description: phase.description,
      messages: phase.messages,
      mutations: phase.mutations,
    });
  };

  return [
    { name: `${config.name}-phase-1`, rule: makePhaseRule(0) },
    { name: `${config.name}-phase-2`, rule: makePhaseRule(1) },
  ];
};
