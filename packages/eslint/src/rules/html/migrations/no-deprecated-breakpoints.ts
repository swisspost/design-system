import { createClassUpdateRule } from '../../../utils/create-class-update-rule';

interface ClassesConfig {
  [key: string]: {
    prefix: Array<string | number>;
    suffix: Array<string | number>;
  };
}

const classesConfig: ClassesConfig = {
  // Grid
  gridCol: {
    prefix: ['col'],
    suffix: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  gridOffset: {
    prefix: ['offset'],
    suffix: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  gridGap: {
    prefix: ['gap', 'row-gap', 'column-gap'],
    suffix: [1, 2, 3, 4, 5],
  },
  // Spacing
  spacingGap: {
    prefix: ['g', 'gx', 'gy'],
    suffix: [1, 2, 3, 4, 5],
  },
  spacingPaddingMargin: {
    prefix: ['p', 'ps', 'pe', 'pt', 'pb', 'px', 'py', 'm', 'ms', 'me', 'mt', 'mb', 'mx', 'my'],
    suffix: [
      'auto',
      1,
      2,
      3,
      4,
      5,
      'hair',
      'line',
      'micro',
      'mini',
      'small-regular',
      'regular',
      'small-large',
      'large',
      'big',
      'bigger-big',
      'small-huge',
      'huge',
      'small-giant',
      'giant',
      'bigger-giant',
    ],
  },
  // Sizing
  sizing: {
    prefix: ['w', 'mw', 'h', 'mh'],
    suffix: [
      'auto',
      25,
      50,
      75,
      100,
      1,
      2,
      3,
      4,
      5,
      'hair',
      'line',
      'micro',
      'mini',
      'small-regular',
      'regular',
      'small-large',
      'large',
      'big',
      'bigger-big',
      'small-huge',
      'huge',
      'small-giant',
      'giant',
      'bigger-giant',
    ],
  },
  // Flex
  flexDirection: {
    prefix: ['flex'],
    suffix: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  flexJustify: {
    prefix: ['justify-content'],
    suffix: ['start', 'end', 'center', 'between', 'around', 'evenly'],
  },
  flexAlignContent: {
    prefix: ['align-content'],
    suffix: ['start', 'end', 'center', 'between', 'around', 'stretch'],
  },
  flexAlign: {
    prefix: ['align-items', 'align-self'],
    suffix: ['start', 'end', 'center', 'baseline', 'stretch'],
  },
  flexOthers: {
    prefix: ['flex'],
    suffix: ['fill', 'grow-0', 'grow-1', 'shrink-0', 'shrink-1', 'nowrap', 'wrap', 'wrapreverse'],
  },
  flexOrder: {
    prefix: ['order'],
    suffix: [0, 1, 2, 3, 4, 5, 'first', 'last'],
  },
  // Other utilities
  float: {
    prefix: ['float'],
    suffix: ['start', 'end', 'none'],
  },
  textAlign: {
    prefix: ['text'],
    suffix: ['left', 'center', 'end'],
  },
  display: {
    prefix: ['d'],
    suffix: [
      'none',
      'inline',
      'inline-block',
      'block',
      'grid',
      'inline-grid',
      'table',
      'table-cell',
      'table-row',
      'flex',
      'inline-flex',
    ],
  },
};

// Breakpoint changes
const breakpointMap: Record<string, string> = {
  sm: 'xs',
  rg: 'sm',
  xxl: 'xl',
};

const messagesPhase1: Record<string, string> = {};
export const mutationsPhase1: Record<string, [string, string]> = {};
const messagesPhase2: Record<string, string> = {};
export const mutationsPhase2: Record<string, [string, string]> = {};

let index = 0;
const tempPrefix = '_tmp-';

// Generate all the possible classes based on the class names, breakpoint and class values
for (const type in classesConfig) {
  for (const prefix of classesConfig[type].prefix) {
    for (const suffix of classesConfig[type].suffix) {
      for (const breakpoint in breakpointMap) {
        const oldClass = `${prefix}-${breakpoint}-${suffix}`;
        const tempClass = `${tempPrefix}${prefix}-${breakpointMap[breakpoint]}-${suffix}`;
        const newClass = `${prefix}-${breakpointMap[breakpoint]}-${suffix}`;

        const keyPhase1 = `deprecatedBreakpointsPhase1_${index}`;

        messagesPhase1[keyPhase1] =
          `The "${oldClass}" class is deprecated. Please replace it with "${newClass}".`;
        mutationsPhase1[keyPhase1] = [oldClass, tempClass];

        const keyPhase2 = `deprecatedBreakpointsPhase2_${index}`;

        messagesPhase2[keyPhase2] =
          `The "${oldClass}" class is deprecated. Please replace it with "${newClass}".`;
        mutationsPhase2[keyPhase2] = [tempClass, newClass];

        index++;
      }
    }
  }
}

export const namePhase1 = 'no-deprecated-breakpoints-phase-1';
export const namePhase2 = 'no-deprecated-breakpoints-phase-2';

export const rulePhase1 = createClassUpdateRule({
  name: namePhase1,
  type: 'problem',
  description:
    'Flags deprecated breakpoint classes and replaces them with others with a temporary name (phase 1).',
  messages: messagesPhase1,
  mutations: mutationsPhase1,
});

export const rulePhase2 = createClassUpdateRule({
  name: namePhase2,
  type: 'problem',
  description:
    'Flags deprecated breakpoint classes and replaces the temporary class names with the final ones. (phase 2)',
  messages: messagesPhase2,
  mutations: mutationsPhase2,
});
