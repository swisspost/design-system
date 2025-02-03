/**
 * This configuration is not for linting the package files.
 * It is used only to test the ESLint configurations exported by the package.
 */

const designSystemESLint = require('./dist');

module.exports = designSystemESLint.configs.templateAll;
