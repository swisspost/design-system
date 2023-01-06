import fetch from 'node-fetch';
import fs from 'fs';
import { optimize, OptimizedSvg } from 'svgo';
import svgoOptions from '../../svgo.config';
import { IIcon } from '../models/icon.model';
import { passphrase } from '../index';

export let noSVG: IIcon[] = [];
export let downloadError: IIcon[] = [];

export const downloadSVG = async (icon: IIcon) => {
  if (!icon.downloadLink) {
    noSVG.push(icon);
    return false;
  }

  try {
    const svg = await fetch(icon.downloadLink, {
      headers: {
        Authorization: `Basic ${passphrase}`,
      },
    });

    const svgString = await svg.text();
    const optimizedSvg = optimize(svgString, svgoOptions);

    if (optimizedSvg.error) {
      throw new Error(optimizedSvg.error);
    }

    const symbolised = (optimizedSvg as OptimizedSvg).data.replace(
      /^(<svg[^>]*>)([\S\s]*)(<\/svg>)$/gim,
      '$1<symbol id="icon">$2</symbol>$3',
    );

    if (!fs.statSync('./icons')) fs.mkdirSync('./icons');
    fs.writeFileSync(`./icons/${icon.name}`, symbolised);
    return symbolised;
  } catch (err) {
    downloadError.push(icon);
    console.log(`SVG Download error: ${err} @ ${icon.downloadLink}`);
  }
};
