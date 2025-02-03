import fs from 'fs';
import { IIconSet } from '../../models/icon.model';

export function setup(iconSets: IIconSet[]) {
  iconSets.forEach(set => {
    // remove download folders & files
    if (fs.existsSync(set.downloadDirectory)) {
      fs.rmSync(set.downloadDirectory, { recursive: true });
    }

    // ensure download folders exists
    if (!fs.existsSync(set.downloadDirectory)) {
      fs.mkdirSync(set.downloadDirectory, { recursive: true });
    }
  });
}
