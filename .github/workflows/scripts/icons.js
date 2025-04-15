const fs = require('fs');
const path = require('path');

function getIconChanges({
  ADDED_FILES,
  MODIFIED_FILES,
  RENAMED_FILES,
  COPIED_FILES,
  DELETED_FILES,
}) {
  const getIcons = (...fileSet) => {
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
  };

  return {
    major: `Deleted icons:\n\n${getIcons(DELETED_FILES)}`,
    minor: `Added icons:\n\n${getIcons(ADDED_FILES)}`,
    patch: `Added icons:\n\n${getIcons(MODIFIED_FILES, RENAMED_FILES, COPIED_FILES)}`,
  };
}

function writeChangesets({ DATE, ICON_CHANGES }) {
  const iconChanges = JSON.parse(ICON_CHANGES);

  const writeChangeset = (icons, bump) => {
    try {
      fs.writeFileSync(
        `./.changeset/${DATE}-${bump}-ui-icon-update.md`,
        `---\n'@swisspost/design-system-icons': ${bump}\n---\n\n${icons}`,
      );
    } catch (err) {
      console.error(err);
    }
  };

  Object.entries(iconChanges).forEach(([bump, icons]) => {
    if (icons) writeChangeset(icons, bump);
  });
}

function writePrBody({ ICON_CHANGES }) {
  const iconChanges = JSON.parse(ICON_CHANGES);

  let content = '# Design system icons are now up to date!';
  Object.values(iconChanges).forEach(icons => {
    if (icons) content += `\n\n##${icons}`;
  });

  try {
    fs.writeFileSync(`./pr-body.md`, content);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getIconChanges,
  writeChangesets,
  writePrBody,
};
