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
 * Generate CSS variables for all icons with consistent naming (DEBUG VERSION)
 */
gulp.task('generate-icon-variables', (done) => {
  const outputDir = path.join(__dirname, 'src/styles/generated');
  const outputFile = path.join(outputDir, '_icon-variables.scss');
  const iconDir = path.join(__dirname, 'node_modules/@swisspost/design-system-icons/src/icons/ui');

  if (!fs.existsSync(iconDir)) {
    console.error(`❌ Icon directory does not exist: ${iconDir}`);
    done(new Error('Icon directory not found'));
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let cssVariables = ':root {\n';
  let errorCount = 0;
  const processedIcons = [];

  try {
    // Get all files - both .svg files and files without extensions
    const allFiles = fs.readdirSync(iconDir);
    const files = allFiles.filter(file => {
      // Include .svg files OR files without any extension (no dot)
      return file.endsWith('.svg') || !file.includes('.');
    });

    files.forEach(file => {
      try {
        // Get clean icon name - handle both .svg files and files without extensions
        let iconName = file.endsWith('.svg')
          ? path.basename(file, '.svg')
          : file; // Use the filename as-is if no extension

        iconName = iconName
          .toLowerCase()
          .replace(/--/g, '-')  // Fix double hyphens
          .replace(/_/g, '-')   // Convert underscores
          .replace(/-+$/g, ''); // Remove trailing hyphens

        // Special handling for size suffixes
        iconName = iconName.replace(/(\D)(\d+)$/, '$1-$2'); // Add hyphen before numbers

        // Remove the word "shape" from the icon name
        iconName = iconName
          .replace(/-shape-/g, '-')  // Remove "-shape-" from middle
          .replace(/^shape-/g, '')   // Remove "shape-" from beginning
          .replace(/-shape$/g, '');  // Remove "-shape" from end

        const svgPath = path.join(iconDir, file);

        // Check if file exists and is readable
        if (!fs.existsSync(svgPath)) {
          console.warn(`⚠️  File not found: ${svgPath}`);
          return;
        }

        let svgContent = fs.readFileSync(svgPath, 'utf8');

        // Clean SVG content
        svgContent = svgContent
          .replace(/<\?xml.*?\?>/, '')
          .replace(/<!DOCTYPE.*?>/, '')
          .replace(/\s+/g, ' ')
          .replace(/"/g, "'")
          .replace(/%/g, '%25')
          .replace(/</g, '%3C')
          .replace(/>/g, '%3E')
          .replace(/#/g, '%23');

        // Use double hyphen to match the mixin expectation
        cssVariables += `  --post-icon--${iconName}: url("data:image/svg+xml,${svgContent}");\n`;
        processedIcons.push(iconName);

        // Debug output for specific icons we're looking for
        if (iconName.includes('code') || iconName.includes('ambulance') || iconName.includes('closex')) {
          console.log(`✅ Found target icon: ${file} → --post-icon--${iconName}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
        errorCount++;
      }
    });

    cssVariables += '}\n';
    fs.writeFileSync(outputFile, cssVariables);

    console.log(`✅ Generated ${outputFile} with ${processedIcons.length} icons (${errorCount} errors)`);

    // Signal completion - this was missing!
    done(errorCount > 0 ? new Error(`${errorCount} icons failed`) : null);

  } catch (error) {
    console.error('❌ Failed to generate icon variables:', error);
    done(error);
  }
});

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
  gulp.series(
    'prebuild-env-vars',
    gulp.parallel(
      gulp.series('map-icons', 'generate-icon-variables', 'copy', 'autoprefixer', 'transform-package-json'),
      gulp.series('temporarily-copy-token-files', 'sass'),
    ),
  ),
);
