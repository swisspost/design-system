const pseudoClassList = ['hover', 'active', 'focus', 'focus-visible', 'focus-within'];
const prefix = ':';

/**
 * Serialize snapshot Pseudo-class arguments into class provided by storybook-addon-pseudo-states to simulate the behavior
 * @param name one or multiple name of a pseudo-class
 */
export function serializeSimulatedPseudoClass(name: string | string[] | undefined): string {
  if (!name) {
    return '';
  }

  const pseudoClass = Array.isArray(name) ? name : [name];

  return pseudoClass.reduce((accumulator, currentValue: string | undefined) => {
    const classes = [accumulator];

    if (currentValue && pseudoClassList.includes(currentValue)) {
      classes.push(`${prefix}${currentValue}`);
    }

    // Useful for some components that trigger focus programmatically
    if (currentValue?.startsWith('focus')) {
      classes.push('focused');
    }

    return classes.join(' ');
  }, '');
}
