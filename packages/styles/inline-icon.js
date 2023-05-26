const fs = require('fs');
const sass = require('sass');

module.exports = function(icon) {
  const iconName = String(icon.dartValue).replace(/^['"]|['"]$/g, ''); // remove any quotes
  const iconFile = `node_modules/@swisspost/design-system-icons/public/post-icons/${iconName}.svg`;

  let iconSvg;
  try {
    iconSvg = fs.readFileSync(iconFile, 'utf8');
    iconSvg = iconSvg.split(/\r?\n/).map(line =>  line.trim()).join(''); // removes line breaks
  } catch {
    throw new Error(`Icon "${iconName}" not found.`);
  }

  return new sass.SassString(`data:image/svg+xml,${iconSvg}`);
}
