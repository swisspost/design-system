import path from 'path';
import { CenshareResultPage, CenshareResult } from '../models/censhare-result-page.model';
import { IIcon } from '../models/icon.model';

const excludedRanges = [[4000, 7999]];
const excludedKeywords = ['Piktogramme "Die Post" ab 2017', 'Piktogramme "Die Post" 2017'];

const isExcluded = (icon: IIcon, filters: number[][]): boolean => {
  const name = Number(icon.file.basename);
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
      const mimeTypeVariants = [item, ...(item.variants ?? [])];
      const svgVariant = mimeTypeVariants.find(variant => variant.mime === 'image/svg+xml');

      if (svgVariant) {
        const fileName = path.basename(svgVariant.name);
        const fileExt = path.extname(svgVariant.name);
        const fileBasename = path.basename(fileName, fileExt).replace(/\s/g, ''); // Some of the icons seem to have a whitespace in the name but not in the filepath itself

        const keywords = [
          ...new Set(
            (item.contentInfo?.freeKeywords ?? '')
              .replace(/(\n|\r\n)/g, '')
              .split(/, ?/)
              .filter(keyword => !excludedKeywords.includes(keyword)),
          ),
        ];

        acc.push({
          uuid: item.uuid,
          id: item.id,
          type: item.type,
          typeFilter: item.typeFilter,
          meta: {
            downloadLink: svgVariant.downloadLink,
            businessfield: item.postInfo?.businessfield,
            keywords,
            year: item.postInfo?.year,
          },
          file: {
            mime: svgVariant.mime,
            name: fileName,
            basename: fileBasename,
            ext: fileExt,
            size: svgVariant.size,
          },
          createdAt: typeof item.createdAt === 'string' ? new Date(item.createdAt) : item.createdAt,
          modifiedAt:
            typeof item.modifiedAt === 'string' ? new Date(item.modifiedAt) : item.modifiedAt,
        });
      }

      return acc;
    }, [])
    .filter(icon => !isExcluded(icon, excludedRanges));
};
