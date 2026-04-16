import { createResponsiveClassUpdateRule } from '../../../utils/create-responsive-class-update-rule';

// Class name prefixes that had responsive variants
const prefixes = ['m', 'mt', 'mb', 'ml', 'mr', 'p', 'pt', 'pb', 'pl', 'pr', 'gap'];

// Previous size tokens mapped to the new responsive pixel class suffixes.
// Entries marked needsReview: true are not 1:1 migrations and must be manually checked.
const sizeMap: Record<string, { suffixes: string[]; needsReview?: boolean }> = {
  'tiny': { suffixes: ['-12', '-md-16'] },
  'small': { suffixes: ['-12', '-sm-16'] },
  'regular': { suffixes: ['-16', '-md-24'] },
  'large': { suffixes: ['-16', '-md-24', '-lg-32'], needsReview: true },
  'big': { suffixes: ['-24', '-md-32', '-lg-40'], needsReview: true },
  'bigger-big': { suffixes: ['-24', '-md-48'] },
  'huge': { suffixes: ['-32', '-md-40', '-lg-56'], needsReview: true },
  'giant': { suffixes: ['-56', '-md-80'] },
};

const classesMap = prefixes.flatMap(prefix =>
  Object.entries(sizeMap).map(([token, { suffixes, needsReview }]) => ({
    old: `${prefix}-${token}-r`,
    new: suffixes.map(s => `${prefix}${s}`),
    needsReview,
  })),
);

export const name = 'no-deprecated-responsive-spacing-utilities';

export const { rule, data } = createResponsiveClassUpdateRule({
  name,
  description:
    'Flags all deprecated responsive spacing utility classes and replaces them with the new ones.',
  classesMap,
});

export default rule;