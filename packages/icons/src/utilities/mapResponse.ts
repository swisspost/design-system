import { CenshareResultPage, CenshareResult } from '../models/censhare-result-page.model';
import { IIcon } from '../models/icon.model';

/**
 * Parses zenshare results into a useful format
 * @param response Zenshare result page
 * @returns Array of icons
 */
export const mapResponse = (response: CenshareResultPage): Array<IIcon> => {
  return response.result.reduce((acc: IIcon[], item: CenshareResult) => {
    const svgVariant = item.variants?.find(variant => variant.mime === 'image/svg+xml');
    if (svgVariant) {
      acc.push({
        downloadLink: svgVariant.downloadLink,
        type: item.type,
        contentInfo: item.contentInfo,
        typeFilter: item.typeFilter,
        name: svgVariant.name.replaceAll(' ', ''), // Some icons seem to have m
        id: item.id,
        postInfo: item.postInfo,
        modifiedAt:
          typeof item.modifiedAt === 'string' ? new Date(item.modifiedAt) : item.modifiedAt,
      });
    }
    return acc;
  }, []);
};
