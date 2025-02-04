/**
 * This configuration is not for linting the package files.
 * It is used only to test the ESLint configurations exported by the package.
 */

const linting = require('./dist');
const migrations = require('./dist/migrations');

module.exports = [...Object.values(linting.configs).flat(), ...migrations];
