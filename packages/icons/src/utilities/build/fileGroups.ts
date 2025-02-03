import fs from 'fs';
import path from 'path';
import { getNameParts } from '../helpers';
import { IFile } from '../../models/icon.model';

import { ID_SEPERATOR, ID_UNWANTED_PARTS, UI_ICON_SIZES } from '../constants';

export function getFileGroups(iconSourceDirectory: string): Record<string, IFile[]> {
  const filePaths = fs.readdirSync(iconSourceDirectory, { recursive: true });

  return filePaths
    .filter(p => p.toString().endsWith('.svg'))
    .reduce((groups, filePath) => {
      filePath = filePath.toString();
      const nameParts = getNameParts(path.basename(filePath, '.svg'));
      const isMultiPartName = nameParts.length > 1;
      const hasSizeIndicator = UI_ICON_SIZES.includes(Number(nameParts[nameParts.length - 1]));

      const id = getGroupId(nameParts, isMultiPartName, hasSizeIndicator);
      const group = groups[id as keyof typeof groups] ?? [];
      const size =
        isMultiPartName && hasSizeIndicator ? parseInt(nameParts[nameParts.length - 1]) : null;
      const file: IFile = {
        size,
        filePath,
      };

      return {
        ...groups,
        [id]: [...group, file],
      };
    }, {});

  function getGroupId(nameParts: string[], isMultiPartName: boolean, hasSizeIndicator: boolean) {
    if (isMultiPartName && hasSizeIndicator) {
      nameParts = nameParts.slice(0, nameParts.length - 1);
    }

    return nameParts
      .map(part => part.toLowerCase())
      .filter(part => !ID_UNWANTED_PARTS.includes(part))
      .join(ID_SEPERATOR);
  }
}
