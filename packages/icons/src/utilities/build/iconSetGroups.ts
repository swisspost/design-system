import type { Icon, JsonReport, IconSetGroups, GroupItem } from '../../models/icon.model';
import iconSets from '../../iconsets.config';
import fs from 'fs';
import path from 'path';
import { getNameParts } from '../shared';

import { ID_SEPERATOR, ID_UNWANTED_PARTS, UI_ICON_SIZES } from '../constants';

export function getIconSetGroups(): IconSetGroups[] {
  return iconSets.map(iconSet => {
    const iconSetReport = JSON.parse(
      fs.readFileSync(path.join(iconSet.downloadDirectory, 'report.json'), 'utf-8'),
    ) as JsonReport;

    return iconSetReport.raw.reduce(
      (
        iconSetGroups: {
          name: string;
          sourceDirectory: string;
          groups: Record<string, GroupItem[]>;
        },
        icon: Icon,
      ) => {
        const nameParts = getNameParts(icon.file.basename);
        const isMultiPartName = nameParts.length > 1;
        const hasSizeIndicator = UI_ICON_SIZES.includes(Number(nameParts[nameParts.length - 1]));

        const name = getGroupId(nameParts, isMultiPartName, hasSizeIndicator);
        const size =
          isMultiPartName && hasSizeIndicator ? parseInt(nameParts[nameParts.length - 1]) : null;
        const existingGroupItems: GroupItem[] = iconSetGroups.groups[name] ?? [];
        const currentGroupItem: GroupItem = {
          size,
          filePath: path.join(iconSet.downloadDirectory, icon.file.name),
          report: icon,
        };

        iconSetGroups.groups = {
          ...iconSetGroups.groups,
          [name]: [...existingGroupItems, currentGroupItem],
        };

        return iconSetGroups;
      },
      { name: iconSet.name, sourceDirectory: iconSet.downloadDirectory, groups: {} },
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
