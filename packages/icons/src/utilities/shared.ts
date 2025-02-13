import type { SourceIcon, MergedIcon, SourceReport, MergedReport } from '../models/icon.model';
import { styleText } from 'node:util';
import { SOURCE_REPORT, MERGED_REPORT } from './constants';

export function getBaseSourceReport(): SourceReport {
  return JSON.parse(JSON.stringify(SOURCE_REPORT));
}

export function getBaseMergedReport(): MergedReport {
  return JSON.parse(JSON.stringify(MERGED_REPORT));
}

export function getNameParts(name: string): string[] {
  return name.split(/([^a-zA-Z0-9])/g).filter(part => !/^[^a-zA-Z0-9]$/.test(part));
}

export function sortIcons(a: SourceIcon | MergedIcon, b: SourceIcon | MergedIcon) {
  return a.file.basename < b.file.basename ? -1 : 1;
}

export function coloredLogMessage(message: string) {
  return message.replaceAll(
    /<(red|blue|green|yellow)>([^<]+)<\/(red|blue|green|yellow)>/g,
    (_, startColor, text, endColor) => {
      if (startColor === endColor) {
        return styleText(startColor, text);
      } else {
        return text;
      }
    },
  );
}
