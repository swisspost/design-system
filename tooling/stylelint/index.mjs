/**
 * Based on [stylelint-config-sass-guidelines](https://www.npmjs.com/package/stylelint-config-sass-guidelines),
 * without the stylistic rules and other small tweaks.
 *
 * @see https://stylelint.io/user-guide/configure
 * @type {import('stylelint').Config}
 */
const config = {
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'at-rule-disallowed-list': ['debug'],
    'at-rule-no-vendor-prefix': true,
    'block-no-empty': true,
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'declaration-block-single-line-max-declarations': 1,
    'declaration-property-value-disallowed-list': {
      'border': ['none'],
      'border-top': ['none'],
      'border-right': ['none'],
      'border-bottom': ['none'],
      'border-left': ['none'],
    },
    'length-zero-no-unit': true,
    'max-nesting-depth': 5,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-unknown': true,
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: [
          '-webkit-mask-size',
          '-webkit-mask-image',
          '-webkit-mask-repeat',
          '-webkit-mask-position',
          '-webkit-mask-composite',
        ],
      },
    ],
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'selector-class-pattern': '^[a-z0-9\\-]+$',
    'selector-max-compound-selectors': 5,
    'selector-max-id': 1,
    'selector-no-qualifying-type': [true, { ignore: ['attribute', 'class'] }],
    'selector-no-vendor-prefix': true,
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': true,
    'shorthand-property-no-redundant-values': true,
    'value-no-vendor-prefix': true,
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': '^[_]?[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/load-no-partial-leading-underscore': true,
    'scss/no-global-function-names': true,
    'scss/percent-placeholder-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/selector-no-redundant-nesting-selector': true,
  },
};

export default config;
