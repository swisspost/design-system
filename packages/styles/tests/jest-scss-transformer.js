const options = require('../package.json').sass;

/**
 * This transforms .scss files to jest tests by exporting
 * a js string which can be run by jest. The output of this
 * file is getting cached, if you change it run "jest --no-cache"
 * to see your changes.
 *
 * This function just tries to render the .scss test file
 * with dart-sass and reports any compilation errors. There
 * are no output comparisons or testing-for-errors capabilities.
 */
module.exports = {
  process: (fileContent, filename) => {
    const filePath = filename.replace(
      /^.*[\\\/]tests[\\\/]|\.test\.scss$/g,
      ""
    ).replace("\\", "\\\\");
    return {
      code: `
      const sass = require('sass');
      describe("${filePath}", () => {
        it("compiles", () => {
          try {
            sass.renderSync({
              file: "${filename.replace(/\\/g, "\\\\")}",
              includePaths: ${JSON.stringify(options.includePaths)},
            });
          } catch (error) {
            throw error.formatted;
          }
        });
      });
    `};
  }
}
