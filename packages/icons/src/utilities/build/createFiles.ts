import fs from 'fs';
import path from 'path';
import { HTMLElement, parse } from 'node-html-parser';
import { optimize } from 'svgo';
import svgoOptions from '../../../svgo.config.ui';
import { IFile } from '../../models/icon.model';

import {
  ID_PREFIX,
  ID_SEPERATOR,
  ID_SYMBOL_PREFIX,
  ID_SYMBOL_SEPERATOR,
  POST_ICON_TEMPLATE,
  UI_ICON_TEMPLATE,
} from '../constants';

export function createFiles(
  iconSourceDirectory: string,
  iconOutputDirectory: string,
  fileGroups: Record<string, IFile[]>[],
) {
  fileGroups.forEach(iconSet => {
    Object.entries(iconSet).forEach(([id, files]) => {
      const isSingleFile = files.length === 1;

      const svgs = files.map(({ size, filePath }) => ({
        size,
        svg: fs.readFileSync(path.join(iconSourceDirectory, filePath), 'utf-8'),
      }));

      const symbolId = isSingleFile ? [ID_PREFIX, id].join(ID_SEPERATOR) : ID_SYMBOL_PREFIX;
      const template = isSingleFile ? POST_ICON_TEMPLATE : UI_ICON_TEMPLATE;

      const symbols = svgs.map(({ size, svg }) => getSymbol(svg, symbolId, size));
      const uses = svgs.map(({ size }) => getUse(symbolId, size));
      const file = createSvg(id, template, symbols, uses);

      fs.writeFileSync(path.join(iconOutputDirectory, `${id}.svg`), file);
    });
  });

  function getSymbol(svg: string, symbolId: string, size: number | null): string {
    svg = optimize(svg, svgoOptions).data;

    const svgElement = parse(svg).querySelector('svg') as HTMLElement;
    const symbolElement = parse('<symbol/>').querySelector('symbol') as HTMLElement;

    symbolElement.setAttribute('id', getSymbolId(symbolId, size));
    symbolElement.innerHTML = svgElement.innerHTML;

    if (svgElement.attributes.viewBox) {
      symbolElement.setAttribute('viewBox', svgElement.attributes.viewBox);
    }

    return symbolElement.toString();
  }

  function getUse(symbolId: string, size: number | null): string {
    const useElement = parse('<use/>').querySelector('use') as HTMLElement;

    if (size !== null)
      useElement.setAttribute('style', `display: var(--${ID_SYMBOL_PREFIX}${size}, none)`);
    useElement.setAttribute('href', `#${getSymbolId(symbolId, size)}`);

    return useElement.toString();
  }

  function getSymbolId(symbolId: string, size: number | null): string {
    return [symbolId, size].filter(p => p).join(ID_SYMBOL_SEPERATOR);
  }

  function createSvg(id: string, template: string, symbols: string[], uses: string[]): string {
    const file = template
      .replaceAll('{id}', `${ID_PREFIX}-${id}`)
      .replace('{symbols}', symbols.join(''))
      .replace('{uses}', uses.join(''));

    return optimize(file, {
      js2svg: {
        pretty: false,
      },
      plugins: [],
    }).data;
  }
}
