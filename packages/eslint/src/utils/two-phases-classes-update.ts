export interface TwoPhasesData {
  messagesPhase1: Record<string, string>;
  mutationsPhase1: Record<string, [string, string]>;
  messagesPhase2: Record<string, string>;
  mutationsPhase2: Record<string, [string, string]>;
}

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
  breakpoints: Array<string>,
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
