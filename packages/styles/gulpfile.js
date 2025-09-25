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

/**
 * Temporary task to copy token files from tokens package to the styles package since
 * pnpm does not correctly install dependencies of dependencies for workspace packages.
 * See https://github.com/pnpm/pnpm/issues/8338 for more information and reproduction
 */
gulp.task('temporarily-copy-token-files', () => {
  return gulp.src(['../tokens/dist/**/*.scss']).pipe(gulp.dest('./src/tokens/temp'));
});

/**
 * Temporary task to copy icon CSS files from icons package to the styles package since
 * pnpm does not correctly install dependencies of dependencies for workspace packages.
 */
gulp.task('temporarily-copy-icon-files', () => {
  return gulp.src(['../icons/dist/custom-properties/**/*.css']).pipe(gulp.dest('./src/icons/temp'));
});

/**
 * Copy icon CSS files to dist folder
 */
gulp.task('copy-icon-files-to-dist', () => {
  return gulp.src(['./src/icons/temp/**/*.css']).pipe(gulp.dest(`${options.outputDir}/icons/temp`));
});

/**
 * Copy task
 */
gulp.task('copy', 
  gulp.series('copy-icon-files-to-dist', () => {
    return gulp
      .src(['./LICENSE', './README.md', './package.json', './src/**/*.scss'])
      .pipe(newer(options.outputDir))
      .pipe(gulp.dest(options.outputDir));
  })
);

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
 * Generate a SCSS variable `$post-icon-version` containing the current package version.
 * This allows the `post-icon` mixin to dynamically resolve the correct icon URL
 * based on the version defined in package.json.
 */
gulp.task('prebuild-env-vars', done => {
  const version = require('./package.json').version;

  const content = `$post-icon-version: '${version}';\n`;

  fs.writeFileSync(path.join(__dirname, 'src/utilities/_env-variables.scss'), content, 'utf8');

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
  gulp.series('temporarily-copy-token-files', 'temporarily-copy-icon-files', () => {
    return gulp.src('./tests/**/*.scss').pipe(
      gulpSass.sync({
        loadPaths: [...options.loadPaths, './'],
        quietDeps: true,
      }),
    );
  }),
);

/**
 * Watch task for scss development
 */
gulp.task(
  'watch',
  gulp.series('temporarily-copy-token-files', 'temporarily-copy-icon-files', () => {
    return gulp.watch('./src/**/*.scss', gulp.series('copy', 'sass:dev'));
  }),
);

/**
 * Run copy and sass task in parallel per default
 */
exports.default = gulp.task(
  'build',
  gulp.series(
    'prebuild-env-vars',
    gulp.parallel(
      'map-icons',
      gulp.series('temporarily-copy-token-files', 'temporarily-copy-icon-files', 'copy', 'transform-package-json', 'autoprefixer', 'sass'),
    ),
  ),
);
