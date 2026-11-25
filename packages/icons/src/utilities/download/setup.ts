import iconSets from '../../iconsets.config';
import fs from 'fs';

export function setup(preserveExisting = false) {
  iconSets.forEach(iconsSet => {
    // remove download folders & files
    if (!preserveExisting && fs.existsSync(iconsSet.downloadDirectory)) {
      fs.rmSync(iconsSet.downloadDirectory, { recursive: true });
    }

    // ensure download folders exists
    if (!fs.existsSync(iconsSet.downloadDirectory)) {
      fs.mkdirSync(iconsSet.downloadDirectory, { recursive: true });
    }
  });
}
