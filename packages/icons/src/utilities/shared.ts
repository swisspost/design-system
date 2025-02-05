import { styleText } from 'node:util';
import { Icon, OutputIcon, JsonReport } from '../models/icon.model';

import { REPORT } from './constants';

export function getBaseReport(): JsonReport {
  return JSON.parse(JSON.stringify(REPORT));
}

export function getNameParts(name: string): string[] {
  return name.split(/([^a-zA-Z0-9])/g).filter(part => !/^[^a-zA-Z0-9]$/.test(part));
}

export function sortIcons(a: Icon | OutputIcon, b: Icon | OutputIcon) {
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
