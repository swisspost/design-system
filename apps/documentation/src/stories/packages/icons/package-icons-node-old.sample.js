// postinstall-icons.js
const fse = require('fs-extra');

const srcDir = 'node_modules/@swisspost/design-system-icons/public/post-icons';
const destDir = 'assets/post-icons';

// To copy a folder or file, select overwrite accordingly
try {
  fse.copySync(srcDir, destDir, { overwrite: true });
  console.log('Icons successfully copied!');
} catch (err) {
  console.error(err);
}
