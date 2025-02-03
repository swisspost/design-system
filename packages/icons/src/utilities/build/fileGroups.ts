import fs from 'fs';
import path from 'path';
import { getNameParts } from '../helpers';
import { IIcon, IJSONReport, IFile } from '../../models/icon.model';

import { ID_SEPERATOR, ID_UNWANTED_PARTS, UI_ICON_SIZES } from '../constants';

export function getFileGroups(iconSourceDirectory: string): Record<string, IFile[]>[] {
  return getIconSetReports().map(iconSetReport => {
    return iconSetReport.icons.reduce((groups, icon) => {
      const nameParts = getNameParts(icon.file.basename);
      const isMultiPartName = nameParts.length > 1;
      const hasSizeIndicator = UI_ICON_SIZES.includes(Number(nameParts[nameParts.length - 1]));

      const id = getGroupId(nameParts, isMultiPartName, hasSizeIndicator);
      const group = groups[id as keyof typeof groups] ?? [];
      const size =
        isMultiPartName && hasSizeIndicator ? parseInt(nameParts[nameParts.length - 1]) : null;
      const file: IFile = {
        size,
        filePath: path.join(iconSetReport.subFolder, icon.file.name),
      };

      return {
        ...groups,
        [id]: [...group, file],
      };
    }, {});
  });

  function getIconSetReports() {
    return fs
      .readdirSync(iconSourceDirectory, { recursive: true })
      .map(filePath => filePath.toString())
      .filter(filePath => path.basename(filePath) === 'report.json')
      .map(filePath => {
        const reportPath = path.join(iconSourceDirectory, filePath);
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8')) as IJSONReport;
        const unsuccessfullIconIds = [...report.noSVG, ...report.errored].map(
          (icon: IIcon) => icon.id,
        );

        return {
          subFolder: path.dirname(filePath),
          icons: report.icons.filter(
            (icon: IIcon) => !unsuccessfullIconIds.some((id: number) => icon.id === id),
          ),
        };
      }, []);
  }

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
