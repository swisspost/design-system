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
  return gulp.src('./src/post-intranet.scss')
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
  return gulp.watch('./src/**/*.scss', gulp.series('copy', 'sass:dev'));
});

/*
 * Run copy and sass task in parallel per default
 */
exports.default = gulp.task(
  "build",
  gulp.parallel("copy", gulp.series("sass"))
);
