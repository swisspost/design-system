const fs = require('fs');
const path = require('path');

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

function getUiIconChanges({
  ADDED_FILES,
  MODIFIED_FILES,
  RENAMED_FILES,
  COPIED_FILES,
  DELETED_FILES,
}) {
  return {
    deleted_icons: getIcons(DELETED_FILES),
    added_icons: getIcons(ADDED_FILES),
    updated_icons: getIcons(MODIFIED_FILES, RENAMED_FILES, COPIED_FILES),
  };
}

function writeChangeset(title, icons, bump) {
  try {
    const content = `---\n'@swisspost/design-system-icons': ${bump}\n---\n\n${title}:\n\n${icons}`;
    fs.writeFileSync(`./.changeset/${DATE}-${bump}-ui-icon-update.md`, content);
  } catch (err) {
    console.error(err);
  }
}

function writeChangesets({ DATE, ICON_CHANGES }) {
  const { deleted_icons, added_icons, updated_icons } = JSON.parse(ICON_CHANGES);

  if (deleted_icons) {
    writeChangeset('Deleted icons', deleted_icons, 'major');
  }

  if (added_icons) {
    writeChangeset('Added icons', added_icons, 'minor');
  }

  if (updated_icons) {
    writeChangeset('Updated icons', updated_icons, 'patch');
  }
}

module.exports = {
  getUiIconChanges,
  writeChangesets,
};
