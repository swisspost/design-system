import { CenshareResultPage, CenshareResult } from '../models/censhare-result-page.model';
import { IIcon } from '../models/icon.model';

const excludedRanges = [[4000, 7999]];

const isExcluded = (icon: IIcon, filters: number[][]): boolean => {
  const name = parseInt(icon.name.replace('.svg', '').replace(' ', ''));
  let isExcluded = false;

  filters.forEach(([min, max]) => {
    if (min <= name && name <= max) {
      isExcluded = true;
    }
  });

  return isExcluded;
};

/**
 * Parses zenshare results into a useful format
 * @param response Zenshare result page
 * @returns Array of icons
 */
export const formatResponse = (response: CenshareResultPage): Array<IIcon> => {
  return response.result
    .reduce((acc: IIcon[], item: CenshareResult) => {
      const svgVariant = item.variants?.find(variant => variant.mime === 'image/svg+xml');
      if (svgVariant) {
        acc.push({
          downloadLink: svgVariant.downloadLink,
          type: item.type,
          contentInfo: item.contentInfo,
          typeFilter: item.typeFilter,
          name: svgVariant.name.replaceAll(' ', ''), // Some icons seem to have a whitespace in the name
          id: item.id,
          postInfo: item.postInfo,
          modifiedAt:
            typeof item.modifiedAt === 'string' ? new Date(item.modifiedAt) : item.modifiedAt,
        });
      }
      return acc;
    }, [])
    .filter(icon => !isExcluded(icon, excludedRanges));
};
