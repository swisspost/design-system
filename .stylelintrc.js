module.exports = {
  plugins: ["stylelint-scss"],
  extends: [
    // Sets official sass coding guidelines
    "stylelint-config-sass-guidelines",

    // Turns off formatting, it's handled by prettier
    "stylelint-prettier/recommended",
  ],
  rules: {
    // Sass guidelines packs the stylelint-order plugin and enables alphabetical order by default, it should be false for smacss order
    "order/properties-alphabetical-order": null,
    "max-nesting-depth": 5,
    "selector-max-compound-selectors": 5,
    "selector-max-id": 1,
    "selector-no-qualifying-type": [true, { "ignore": ["attribute", "class"] }],
    "function-url-quotes": null
  },
};
