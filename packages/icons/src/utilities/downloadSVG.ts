import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import svgoOptions from '../../svgo.config';
import { IIcon } from '../models/icon.model';
import { getRequestInit } from './environment';

// Attempt to sanitize the received svg string
const extractSVG = (input: string) => {
  const regex = new RegExp(/<svg[\S\s]*<\/svg>/m);
  const matches = input.match(regex);
  return matches === null ? input : matches[0];
};

export const downloadSVG = async (icon: IIcon, output: string) => {
  if (!icon.meta.downloadLink) {
    return false;
  }

  try {
    const svg = await fetch(icon.meta.downloadLink, getRequestInit());
    const svgString = await svg.text();
    const optimizedSvg = optimize(extractSVG(svgString), svgoOptions);
    const optimizedName = icon.file.name
      .split('.')
      .map(token => token.trim())
      .join('.');

    fs.writeFileSync(path.join(output, optimizedName), optimizedSvg.data);
    return optimizedSvg.data;
  } catch (err) {
    console.log(`SVG Download error: ${err} @ ${icon.meta.downloadLink}`);
    throw err;
  }
};
