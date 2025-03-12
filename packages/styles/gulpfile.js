const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('sass-embedded');
const newer = require('gulp-newer');
const gulpSass = require('gulp-sass')(sass);
const sourcemaps = require('gulp-sourcemaps');
const gulpPostCss = require('gulp-postcss');
const postcssScss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const { globSync } = require('glob');
const options = require('./package.json').sass;

const COMPONENT_SOURCE_PATHS = [path.join(__dirname, '../components/src/components')];
const COMPONENT_NOT_DEFINED_TEMPLATE_PATH = path.join(
  __dirname,
  'src/templates/_not-defined.template.scss',
);
const COMPONENT_NOT_DEFIEND_OUTPUT_PATH = path.join(__dirname, 'src/utilities/_not-defined.scss');

/**
 * Copy task
 */
gulp.task('copy', () => {
  return gulp
    .src(['./LICENSE', './README.md', './package.json', './src/**/*.scss'])
    .pipe(newer(options.outputDir))
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Temporary task to copy token files from tokens package to the styles package since
 * pnpm does not correctly install dependencies of dependencies for workspace packages.
 * See https://github.com/pnpm/pnpm/issues/8338 for more information and reproduction
 */
gulp.task('temporarily-copy-token-files', () => {
  return gulp.src(['../tokens/dist/**/*.scss']).pipe(gulp.dest('./src/tokens/temp'));
});

/**
 * Autoprefix SCSS files
 */
gulp.task('autoprefixer', function () {
  return gulp
    .src(`${options.outputDir}/**/*.scss`)
    .pipe(
      gulpPostCss([autoprefixer()], {
        syntax: postcssScss,
      }),
    )
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Create a SCSS icon map from @swisspost/design-system-icons SVGs (for development only)
 */
gulp.task('map-icons', done => {
  const iconVariables = globSync(
    'node_modules/@swisspost/design-system-icons/src/icons/post/*.svg',
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
    .src('./src/**/*.scss')
    .pipe(
      gulpSass({
        style: 'compressed',
        loadPaths: options.loadPaths,
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
    .src('./src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      gulpSass({
        loadPaths: options.loadPaths,
        quietDeps: true,
      }),
    )
    .pipe(gulpPostCss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Compile scss tests
 */
gulp.task(
  'sass:tests',
  gulp.series('temporarily-copy-token-files', () => {
    return gulp.src('./tests/**/*.scss').pipe(
      gulpSass.sync({
        loadPaths: [...options.loadPaths, './'],
        quietDeps: true,
      }),
    );
  }),
);

/**
 * Get all available components names from the components package and add them to the scss file (packages\styles\src\utilities\_not-defined.scss) which sets initial visibility to hidden (for unregistered state).
 */

gulp.task('generate-not-defined-components-scss', done => {
  const webComponentNames = COMPONENT_SOURCE_PATHS.reduce((names, srcPath) => {
    if (fs.existsSync(srcPath)) {
      const componentNames = fs.readdirSync(srcPath);
      const camelCaseNames = componentNames.map(name =>
        name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
      );
      names.push(...camelCaseNames);
    }
    return names;
  }, []);

  const template = fs.readFileSync(COMPONENT_NOT_DEFINED_TEMPLATE_PATH, 'utf8');
  const output = template.replace('/* WEB_COMPONENT_NAMES */', webComponentNames.join(',\n  '));

  fs.writeFileSync(COMPONENT_NOT_DEFIEND_OUTPUT_PATH, output, 'utf8');
  done();
});

/**
 * Watch task for scss development
 */
gulp.task(
  'watch',
  gulp.series('temporarily-copy-token-files', () => {
    return gulp.watch('./src/**/*.scss', gulp.series('copy', 'sass:dev'));
  }),
);

/**
 * Run copy and sass task in parallel per default
 */
exports.default = gulp.task(
  'build',
  gulp.parallel(
    gulp.series(
      'generate-not-defined-components-scss',
      'map-icons',
      'copy',
      'autoprefixer',
      'transform-package-json',
    ),
    gulp.series('temporarily-copy-token-files', 'sass'),
  ),
);
