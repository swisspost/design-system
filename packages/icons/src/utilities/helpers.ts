import { IJSONReport } from '../models/icon.model';
import { REPORT } from './constants';

export function getBaseReport(): IJSONReport {
  return JSON.parse(JSON.stringify(REPORT));
}

export function getNameParts(name: string): string[] {
  return name.split(/([^a-zA-Z0-9])/g).filter(part => !/^[^a-zA-Z0-9]$/.test(part));
}
