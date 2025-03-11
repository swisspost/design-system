import type {
  SourceIcon,
  SourceReport,
  IconSetGroups,
  IconSetGroupsItem,
} from '../../models/icon.model';
import iconSets from '../../iconsets.config';
import fs from 'fs';
import path from 'path';
import { getNameParts } from '../shared';

import { ID_SEPERATOR, ID_UNWANTED_PARTS, UI_ICON_SIZES } from '../constants';

export function getIconSetGroups(): IconSetGroups[] {
  return iconSets.map(iconSet => {
    const iconSetSourceReport = JSON.parse(
      fs.readFileSync(path.join(iconSet.downloadDirectory, 'report.json'), 'utf-8'),
    ) as SourceReport;

    return iconSetSourceReport.icons.reduce(
      (
        iconSetGroups: {
          name: string;
          options: {
            sourceDirectory: string;
            expectedSourcesPerIcon: number;
          };
          groups: Record<string, IconSetGroupsItem[]>;
        },
        icon: SourceIcon,
      ) => {
        const nameParts = getNameParts(icon.file.basename);
        const isMultiPartName = nameParts.length > 1;
        const hasSizeIndicator = UI_ICON_SIZES.includes(Number(nameParts[nameParts.length - 1]));

        const name = getGroupId(nameParts, isMultiPartName, hasSizeIndicator);
        const size =
          isMultiPartName && hasSizeIndicator ? parseInt(nameParts[nameParts.length - 1]) : null;
        const existingItems: IconSetGroupsItem[] = iconSetGroups.groups[name] ?? [];
        const currentItem: IconSetGroupsItem = {
          size,
          filePath: path.join(iconSet.downloadDirectory, icon.file.name),
          sourceIcon: icon,
        };

        iconSetGroups.groups = {
          ...iconSetGroups.groups,
          [name]: [...existingItems, currentItem],
        };

        return iconSetGroups;
      },
      {
        name: iconSet.name,
        options: {
          sourceDirectory: iconSet.downloadDirectory,
          expectedSourcesPerIcon: iconSet.expectedSourcesPerIcon,
        },
        groups: {},
      },
    );
  });

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
