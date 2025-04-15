const path = require('path');

function getUiIconChanges({
  ADDED_FILES,
  MODIFIED_FILES,
  RENAMED_FILES,
  COPIED_FILES,
  DELETED_FILES,
}) {
  function getIcons(...fileSet) {
    const icons = new Map();
    fileSet
      .flatMap(files => files.split(' '))
      .filter(str => str !== '')
      .forEach(file => {
        const chunks = path.basename(file, path.extname(file)).split('_');
        const icon = chunks[0];
        const size = chunks[chunks.length - 1];
        const variant = chunks.includes('Solid') ? 'solid' : 'line';

        const details = icons.get(icon) || { sizes: new Set(), variants: new Set() };
        details.sizes.add(size);
        details.variants.add(variant);

        icons.set(icon, details);
      });

    return Array.from(icons.entries())
      .map(([icon, { sizes, variants }]) => {
        const allVariants = Array.from(variants).sort().join(' & ');
        const allSizes = Array.from(sizes)
          .sort()
          .join(', ')
          .replace(/, ([^,]*)$/, ', and $1');
        return `- \`${icon}\` (${allVariants}): ${allSizes}px`;
      })
      .join('\n');
  }

  return {
    deleted_icons: getIcons(DELETED_FILES),
    added_icons: getIcons(ADDED_FILES),
    updated_icons: getIcons(MODIFIED_FILES, RENAMED_FILES, COPIED_FILES),
  };
}

module.exports = {
  getUiIconChanges,
};
