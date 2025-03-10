import iconSets from '../../iconsets.config';
import fs from 'fs';

export function setup() {
  iconSets.forEach(iconsSet => {
    // remove download folders & files
    if (fs.existsSync(iconsSet.downloadDirectory)) {
      fs.rmSync(iconsSet.downloadDirectory, { recursive: true });
    }

    // ensure download folders exists
    if (!fs.existsSync(iconsSet.downloadDirectory)) {
      fs.mkdirSync(iconsSet.downloadDirectory, { recursive: true });
    }
  });
}
