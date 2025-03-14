import type { SourceIcon } from '../../models/icon.model';
import svgoOptions from '../../../svgo.config';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import { requestInit } from '../environment';

export async function fetchFile(icon: SourceIcon, output: string) {
  if (!icon.meta.downloadLink) {
    return false;
  }

  try {
    const svg = await fetch(icon.meta.downloadLink, requestInit);
    const svgString = await svg.text();
    const optimizedSvg = optimize(extractSVG(svgString), svgoOptions);
    const optimizedName = icon.file.name
      .split('.')
      .map(token => token.trim())
      .join('.');

    fs.writeFileSync(path.join(output, optimizedName), optimizedSvg.data);
    return optimizedSvg.data;
  } catch (err) {
    console.log(
      `SVG Download Error: Failed to download ${icon.file.name} from ${icon.meta.downloadLink}\n`,
    );
    throw err;
  }

  // Attempt to sanitize the received svg string
  function extractSVG(input: string): string {
    const regex = new RegExp(/<svg[\S\s]*<\/svg>/m);
    const matches = input.match(regex);
    return matches === null ? input : matches[0];
  }
}
