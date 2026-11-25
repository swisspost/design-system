#!/usr/bin/env node
import fs from 'fs';
import { CUSTOM_OUTPUT_PATH } from './utilities/constants';
import { fetchSVGs } from './fetch';

if (process.argv[2] !== 'fetch') {
  throw new Error('Expected the fetch command: design-system-icons fetch --out <dir>.');
}

if (!CUSTOM_OUTPUT_PATH) {
  throw new Error('The --out option requires a non-empty output directory.');
}

if (fs.existsSync(CUSTOM_OUTPUT_PATH) && fs.readdirSync(CUSTOM_OUTPUT_PATH).length > 0) {
  console.warn('Warning: the output directory is not empty. Matching files may be overwritten.');
}

void fetchSVGs(true);
