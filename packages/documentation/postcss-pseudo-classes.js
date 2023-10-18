/**
 * PostCSS plugin to automatically add in companion classes where pseudo-selectors are used.
 * This allows you to add the class name to force the styling of a pseudo-selector, which can be really helpful for testing or being able to concretely reach all style states.
 * @param {array} [options.blacklist] - Define elements to be ignored
 * @param {array} [options.restrictTo] - Create classes for a restricted list of selectors. e.g. [':nth-child', 'hover']
 * @param {boolean} [options.allCombinations=false] - When enabled output with all combinations of pseudo styles/pseudo classes.
 * @param {boolean} [options.preserveBeforeAfter=true] - When enabled output does not generate pseudo classes for `:before` and `:after`.
 * @param {string} [options.prefix='\\:'] - Define the pseudo-class class prefix. Default: ':' so the class name will be ':hover' for example.
 * @author giuseppeg <https://github.com/giuseppeg>
 * @author philippone <https://github.com/philippone>
 * @author michaeldfoley <https://github.com/michaeldfoley>
 * @see {@link https://github.com/giuseppeg/postcss-pseudo-classes}
 * @returns {{postcssPlugin: string, Once(*): void}}
 */
const plugin = (options = {}) => {
  options.preserveBeforeAfter = options?.preserveBeforeAfter || true;

  // Backwards compatibility--we always by default ignored `:root`.
  const blacklist = {
    ':root': true,
    ':host': true,
    ':host-context': true,
    ':not': true,
    ':is': true,
    ':where': true,
  };

  const prefix = options?.prefix || '\\:';

  (options?.blacklist || []).forEach(function (blacklistItem) {
    blacklist[blacklistItem] = true;
  });

  let restrictTo;

  if (Array.isArray(options.restrictTo) && options.restrictTo.length) {
    restrictTo = options.restrictTo.reduce(function (target, pseudoClass) {
      const finalClass =
        (pseudoClass.charAt(0) === ':' ? '' : ':') + pseudoClass.replace(/\(.*/g, '');
      if (!Object.hasOwn(target, finalClass)) {
        target[finalClass] = true;
      }
      return target;
    }, {});
  }

  return {
    postcssPlugin: 'postcss-pseudo-classes',
    Once(css) {
      css.walkRules(function (rule) {
        let combinations;

        rule.selectors.forEach(function (selector) {
          // Ignore some popular things that are never useful
          if (blacklist[selector]) {
            return;
          }

          const selectorParts = selector.split(' ');
          const pseudoedSelectorParts = [];

          selectorParts.forEach(function (selectorPart, index) {
            const pseudos = selectorPart.match(/::?([^:]+)/g);

            if (!pseudos) {
              if (options.allCombinations) {
                pseudoedSelectorParts[index] = [selectorPart];
              } else {
                pseudoedSelectorParts.push(selectorPart);
              }
              return;
            }

            const baseSelector = selectorPart.substr(
              0,
              selectorPart.length - pseudos.join('').length,
            );

            const classPseudos = pseudos.map(function (pseudo) {
              const pseudoToCheck = pseudo.replace(/\(.*/g, '');
              // restrictTo a subset of pseudo classes
              if (
                blacklist[pseudoToCheck] ||
                pseudoToCheck.split('.').some(item => blacklist[item]) ||
                pseudoToCheck.split('#').some(item => blacklist[item]) ||
                (restrictTo && !restrictTo[pseudoToCheck])
              ) {
                return pseudo;
              }

              // Ignore pseudo-elements!
              if (pseudo.match(/^::/)) {
                return pseudo;
              }

              // Ignore ':before' and ':after'
              if (options.preserveBeforeAfter && [':before', ':after'].indexOf(pseudo) !== -1) {
                return pseudo;
              }

              // Kill the colon
              pseudo = pseudo.substr(1);

              // check if pseudo is css function with opening and closing parentheses (.+)
              if (pseudo.match(/\(.+\)/)) {
                // Replace left and right parens
                pseudo = pseudo.replace(/\(/g, '\\(');
                pseudo = pseudo.replace(/\)/g, '\\)');
              } else {
                // Replace left and right parens
                pseudo = pseudo.replace(/\(/g, '(');
                pseudo = pseudo.replace(/\)/g, ')');
              }

              return '.' + prefix + pseudo;
            });

            // Add all combinations of pseudo selectors/pseudo styles given a
            // selector with multiple pseudo styles.
            if (options.allCombinations) {
              combinations = createCombinations(pseudos, classPseudos);
              pseudoedSelectorParts[index] = [];

              combinations.forEach(function (combination) {
                pseudoedSelectorParts[index].push(baseSelector + combination);
              });
            } else {
              pseudoedSelectorParts.push(baseSelector + classPseudos.join(''));
            }
          });

          if (options.allCombinations) {
            const serialCombinations = createSerialCombinations(
              pseudoedSelectorParts,
              appendWithSpace,
            );

            serialCombinations.forEach(function (combination) {
              addSelector(combination);
            });
          } else {
            addSelector(pseudoedSelectorParts.join(' '));
          }

          function addSelector(newSelector) {
            if (newSelector && newSelector !== selector) {
              rule.selector += ',\n' + newSelector;
            }
          }
        });
      });
    },
  };
};

plugin.postcss = true;

module.exports = plugin;

// a.length === b.length
function createCombinations(a, b) {
  let combinations = [''];
  let newCombinations;
  for (let i = 0, len = a.length; i < len; i += 1) {
    newCombinations = [];
    combinations.forEach(function (combination) {
      newCombinations.push(combination + a[i]);
      // Don't repeat work.
      if (a[i] !== b[i]) {
        newCombinations.push(combination + b[i]);
      }
    });
    combinations = newCombinations;
  }
  return combinations;
}

// arr = [[list of 1st el], [list of 2nd el] ... etc]
function createSerialCombinations(arr, fn) {
  let combinations = [''];
  let newCombinations;
  arr.forEach(function (elements) {
    newCombinations = [];
    elements.forEach(function (element) {
      combinations.forEach(function (combination) {
        newCombinations.push(fn(combination, element));
      });
    });
    combinations = newCombinations;
  });
  return combinations;
}

function appendWithSpace(a, b) {
  if (a) {
    a += ' ';
  }
  return a + b;
}
