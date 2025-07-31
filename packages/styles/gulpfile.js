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
 * Create a SCSS icon map from UI icons with size detection
 */
gulp.task('map-ui-icons', done => {
  const iconFiles = globSync('node_modules/@swisspost/design-system-icons/src/icons/ui/*');
  const BATCH_SIZE = 400;
  const allIconGroups = {};
  const iconSizes = new Set();
  
  // Group files into batches
  const batches = [];
  for (let i = 0; i < iconFiles.length; i += BATCH_SIZE) {
    batches.push(iconFiles.slice(i, i + BATCH_SIZE));
  }
    
  // Process each batch
  batches.forEach((batch, batchIndex) => {    
    batch.forEach(iconPath => {
      const fileName = path.basename(iconPath);
      
      if (fs.statSync(iconPath).isDirectory()) {
        return;
      }
      
      const baseFileName = fileName.replace(/\.svg$/, '');
      const sizeMatch = baseFileName.match(/_(\d+)$/);
      
      if (sizeMatch) {
        const size = sizeMatch[1];
        let baseName = baseFileName.replace(`_${size}`, '');
        
        // Transform the name
        if (baseName.includes('_Solid_Shape')) {
          baseName = baseName.replace(/_Solid_Shape$/, '').replace(/_/g, '').toLowerCase() + '-solid';
        } else if (baseName.includes('_Solid')) {
          baseName = baseName.replace(/_Solid$/, '').replace(/_/g, '').toLowerCase() + '-solid';
        } else {
          baseName = baseName.replace(/_Shape$/, '').replace(/_/g, '').toLowerCase();
        }
        
        iconSizes.add(size);
        
        if (!allIconGroups[baseName]) {
          allIconGroups[baseName] = {};
        }
        
        try {
          const fileContent = fs.readFileSync(iconPath, 'utf8');
          
          if (!fileContent.trim().startsWith('<?xml') && !fileContent.trim().startsWith('<svg')) {
            return;
          }
          
          const iconSvg = fileContent
            .split(/\r?\n/)
            .map(line => line.trim())
            .join('')
            .replace(/"/g, "'")
            .replace(/ fill='(none|currentColor)'/g, '')
            .replace(/</g, '%3C')
            .replace(/>/g, '%3E')
            .replace(/#/g, '%23')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29');
          
          allIconGroups[baseName][size] = `"data:image/svg+xml,${iconSvg}"`;
        } catch (error) {
          // Skip problematic files
        }
      }
    });
    
    // Force garbage collection after each batch (if available)
    if (global.gc) {
      global.gc();
    }
  });
  
  // Generate SCSS map
  let scssContent = `$ui-icon-map: (\n`;
  
  // Process icon groups in smaller chunks for final output
  const iconNames = Object.keys(allIconGroups).sort();
  const CHUNK_SIZE = 50;
  
  for (let i = 0; i < iconNames.length; i += CHUNK_SIZE) {
    const chunk = iconNames.slice(i, i + CHUNK_SIZE);
    
    chunk.forEach(iconName => {
      const sizes = allIconGroups[iconName];
      scssContent += `  '${iconName}': (\n`;
      
      Object.keys(sizes).sort((a, b) => Number(a) - Number(b)).forEach(size => {
        scssContent += `    '${size}': ${sizes[size]},\n`;
      });
      
      scssContent += `  ),\n`;
    });
    
    // Force garbage collection every chunk
    if (global.gc) {
      global.gc();
    }
  }
  
  scssContent += `);\n\n`;
  
  // Add helper function
  scssContent += `@function get-ui-icon($name, $size: '24') {\n`;
  scssContent += `  @if map-has-key($ui-icon-map, $name) {\n`;
  scssContent += `    $icon-sizes: map-get($ui-icon-map, $name);\n`;
  scssContent += `    @if map-has-key($icon-sizes, $size) {\n`;
  scssContent += `      @return map-get($icon-sizes, $size);\n`;
  scssContent += `    } @else {\n`;
  scssContent += `      $first-size: nth(map-keys($icon-sizes), 1);\n`;
  scssContent += `      @return map-get($icon-sizes, $first-size);\n`;
  scssContent += `    }\n`;
  scssContent += `  } @else {\n`;
  scssContent += `    @error "Icon '#{$name}' not found";\n`;
  scssContent += `  }\n`;
  scssContent += `}\n\n`;
  
  // Add UI icon mixin
  scssContent += `@mixin ui-icon($name, $width: 1em, $height: $width, $color: currentColor) {\n`;
  scssContent += `  $size: '24';\n`;
  scssContent += `  @if type-of($width) == number and unit($width) == 'px' {\n`;
  scssContent += `    $size: '#{round($width / 1px)}';\n`;
  scssContent += `  } @else if $width == 1rem or $width == 16px { $size: '16'; }\n`;
  scssContent += `  @else if $width == 1.5rem or $width == 24px { $size: '24'; }\n`;
  scssContent += `  @else if $width == 3rem or $width == 48px { $size: '48'; }\n`;
  scssContent += `  display: inline-block;\n`;
  scssContent += `  width: $width;\n`;
  scssContent += `  height: $height;\n`;
  scssContent += `  vertical-align: -0.15em;\n`;
  scssContent += `  background-color: $color;\n`;
  scssContent += `  $icon-url: get-ui-icon($name, $size);\n`;
  scssContent += `  -webkit-mask: url('#{$icon-url}') center/contain no-repeat;\n`;
  scssContent += `  mask: url('#{$icon-url}') center/contain no-repeat;\n`;
  scssContent += `}\n`;
  
  fs.writeFileSync(path.join('./src', '_ui-icon-map.scss'), scssContent, 'utf8');
  
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
      gulp.series('map-icons', 'map-ui-icons', 'copy', 'autoprefixer', 'transform-package-json'),
      gulp.series('temporarily-copy-token-files', 'sass'),
    ),
  ),
);
