const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const gulpPostCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { globSync } = require('glob');
const options = require('./package.json').sass;

/**
 * Copy task
 */
gulp.task('copy', () => {
  return gulp
    .src(['./LICENSE', './README.md', './package.json', './src/**/*.scss'])
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Create a SCSS icon map from @swisspost/design-system-icons SVGs (for development only)
 */
gulp.task('map-icons', done => {
  const iconVariables = globSync(
    'node_modules/@swisspost/design-system-icons/public/post-icons/*.svg',
  ).reduce((entries, iconPath) => {
    const iconName = path.basename(iconPath, '.svg');

    let iconSvg;
    try {
      iconSvg = fs
        .readFileSync(iconPath, 'utf8')
        // removes line breaks
        .split(/\r?\n/)
        .map(line => line.trim())
        .join('')
        // replace double quotes
        .replace(/"/g, "'")
        // remove fill color
        .replace(/ fill='(none|currentColor)'/g, '')
        // replace special characters
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/#/g, '%23')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
    } catch {
      throw new Error(`Icon "${iconName}" not found.`);
    }

    return entries + `  '${iconName}':\n    "data:image/svg+xml,${iconSvg}",\n`;
  }, '\n');

  fs.writeFileSync(
    path.join('./src', '_svg-icon-map.scss'),
    `$svg-icon-map: (${iconVariables});\n`,
  );

  done();
});

/**
 * Transform `package.json` of the published subdirectory
 *
 * @remarks removes `publishConfig.directory`.
 * The publish command runs against `publishConfig.directory`, so keeping the original path
 * would attempt publishing `styles/dist/dist` instead of `styles/dist`.
 *
 */
gulp.task('transform-package-json', done => {
  const packageJson = require('./package.json');

  delete packageJson.publishConfig.directory;

  fs.writeFileSync(
    path.join(options.outputDir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );

  done();
});

/**
 * Compile Scss to Css
 *  - Compile
 *  - Autoprefix
 *  - Also puts compiled Css into tsc-out
 */
gulp.task('sass', () => {
  return gulp
    .src('./src/*.scss')
    .pipe(
      gulpSass({
        outputStyle: 'compressed',
        includePaths: options.includePaths,
        quietDeps: true,
      }),
    )
    .pipe(gulpPostCss([autoprefixer()]))
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Generate uncompressed sass output
 */
gulp.task('sass:dev', () => {
  return gulp
    .src('./src/*.scss', { since: gulp.lastRun('sass:dev') })
    .pipe(
      gulpSass({
        includePaths: options.includePaths,
        quietDeps: true,
      }),
    )
    .pipe(gulpPostCss([autoprefixer()]))
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Compile scss tests
 */
gulp.task('sass:tests', () => {
  return gulp.src('./tests/**/*.scss').pipe(
    gulpSass.sync({
      includePaths: options.includePaths,
      quietDeps: true,
    }),
  );
});

/**
 * Watch task for scss development
 */
gulp.task('watch', () => {
  return gulp.watch('./src/**/*.scss', gulp.series('map-icons', 'copy', 'watch'));
});

/**
 * Run copy and sass task in parallel per default
 */
exports.default = gulp.task(
  'build',
  gulp.parallel(gulp.series('map-icons', 'copy', 'transform-package-json'), gulp.series('sass')),
);
