const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const gulpPostCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const options = require('./package.json').sass;
/*
 * Copy task
 */
gulp.task("copy", () => {
  return gulp
    .src([
      "./LICENSE",
      "./README.md",
      "./package.json",
      "./src/**/*.scss"
    ])
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Transform `package.json` of the published subdirectory
 * 
 * @remarks removes `publishConfig.directory`.
 * The publish command runs against `publishConfig.directory`, so keeping the original path 
 * would attempt publishing `web-styles/dist/dist` instead of `web-styles/dist`.
 * 
 */
gulp.task('transform-package-json', (done) => {
  const packageJson = require('./package.json');

  delete packageJson.publishConfig.directory;

  fs.writeFileSync(
    path.join(options.outputDir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );

  done();
});

/*
 * Compile Scss to Css
 *  - Compile
 *  - Autoprefix
 *  - Also puts compiled Css into tsc-out
 */
gulp.task('sass', () => {
  return gulp.src('./src/*.scss')
    .pipe(gulpSass({
      outputStyle: 'compressed',
      includePaths: options.includePaths,
      quietDeps: true
    }))
    .pipe(gulpPostCss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Generate uncompressed sass output
 */
gulp.task('sass:dev', () => {
  return gulp.src('./src/*.scss', { since: gulp.lastRun('sass:dev')})
    .pipe(gulpSass({
      includePaths: options.includePaths,
      quietDeps: true
    }))
    .pipe(gulpPostCss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest(options.outputDir));
});

/**
 * Watch task for scss development
 */
gulp.task('watch', () => {
  return gulp.watch('./src/**/*.scss', gulp.series('copy', 'watch'));
});

/*
 * Run copy and sass task in parallel per default
 */
exports.default = gulp.task(
  "build",
  gulp.parallel(gulp.series("copy", "transform-package-json"), gulp.series("sass"))
);
