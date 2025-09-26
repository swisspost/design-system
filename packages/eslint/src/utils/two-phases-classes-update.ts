import { TSESLint } from '@typescript-eslint/utils';
import { RuleDocs } from './create-rule';
import { createClassUpdateRule } from './create-class-update-rule';

export interface TwoPhasesData {
  messagesPhase1: Record<string, string>;
  mutationsPhase1: Record<string, [string, string]>;
  messagesPhase2: Record<string, string>;
  mutationsPhase2: Record<string, [string, string]>;
}

// Empty string means no middle part
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
  const returnData: TwoPhasesData = {
    messagesPhase1: {},
    mutationsPhase1: {},
    messagesPhase2: {},
    mutationsPhase2: {},
  };

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

        returnData.messagesPhase1[
          keyPhase1
        ] = `The "${oldClass}" class is deprecated. Please replace it with "${finalNewClass}".`;
        // Mutate from `oldClass` to `_tmp-newClass`
        returnData.mutationsPhase1[keyPhase1] = [oldClass, tempClass];

        const keyPhase2 = `${messageId}Phase2_${index}`;

        returnData.messagesPhase2[
          keyPhase2
        ] = `The "${oldClass}" class is deprecated. Please replace it with "${finalNewClass}".`;
        // Mutate from `_tmp-newClass` to `newClass`
        returnData.mutationsPhase2[keyPhase2] = [tempClass, finalNewClass];

        index++;
      }
    }
  }

  return returnData;
}

export function createTwoPhasesRules(
  data: TwoPhasesData,
  name: string,
  descriptionPhase1: string,
  descriptionPhase2: string,
): {
  namePhase1: string;
  namePhase2: string;
  rulePhase1: TSESLint.RuleModule<string, [], RuleDocs, TSESLint.RuleListener>;
  rulePhase2: TSESLint.RuleModule<string, [], RuleDocs, TSESLint.RuleListener>;
} {
  const namePhase1 = `${name}-phase-1`;
  const namePhase2 = `${name}-phase-2`;

  const rulePhase1 = createClassUpdateRule({
    name: namePhase1,
    type: 'problem',
    description: descriptionPhase1,
    messages: data.messagesPhase1,
    mutations: data.mutationsPhase1,
  });

  const rulePhase2 = createClassUpdateRule({
    name: namePhase2,
    type: 'problem',
    description: descriptionPhase2,
    messages: data.messagesPhase2,
    mutations: data.mutationsPhase2,
  });

  return { namePhase1, namePhase2, rulePhase1, rulePhase2 };
}
