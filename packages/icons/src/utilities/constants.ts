import type { SourceReport, MergedReport } from '../models/icon.model';
import { version } from '../../package.json';
import { coloredLogMessage } from './shared';

export const DOWNLOAD_PAGE_DELAY = 1200;

export const SOURCE_PATH = 'src/icons';
export const OUTPUT_PATH = 'public';
export const OUTPUT_PATH_ICONS = `${OUTPUT_PATH}/post-icons`;

export const SOURCE_REPORT: SourceReport = {
  icons: [],
  errored: [],
  noSVG: [],
  wrongViewBox: [],
  noKeywords: [],
  duplicates: [],
  stats: {
    success: 0,
    errors: 0,
    noSVG: 0,
    wrongViewBox: 0,
    noKeywords: 0,
    duplicates: 0,
  },
  created: new Date(),
  version: version,
};

export const MERGED_REPORT: MergedReport = {
  icons: [],
  stats: {
    set: {},
    sources: 0,
    errored: 0,
    noSVG: 0,
    wrongViewBox: 0,
    hasAllSources: 0,
    noKeywords: 0,
    duplicates: 0,
    success: 0,
  },
  created: new Date(),
  version: version,
};

export const UI_ICON_SIZES = [16, 24, 32, 40, 48, 64];

export const ID_PREFIX = 'i';
export const ID_SEPERATOR = '-';
export const ID_UNWANTED_PARTS = ['shape'];
export const ID_SYMBOL_PREFIX = 's';
export const ID_SYMBOL_SEPERATOR = '';

export const POST_ICON_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    {symbols}
  </defs>
  {uses}
</svg>`;

const UI_ICON_TEMPLATE_STYLES = `<style>
  ${UI_ICON_SIZES.map((size, i) => {
    const query = [];

    if (i > 0) query.push(`(min-width: ${UI_ICON_SIZES[i]}px)`);
    if (i < UI_ICON_SIZES.length - 1) query.push(`(max-width: ${UI_ICON_SIZES[i + 1] - 0.02}px)`);

    return `@media ${query.join(' and ')} {
      g {
        --${ID_SYMBOL_PREFIX}${size}: block;
      }
    }`;
  }).join('\n\n')}
  </style>`;

export const UI_ICON_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="{id}">
      {symbols}
      {uses}
    </symbol>
  </defs>
  
  ${UI_ICON_TEMPLATE_STYLES.split('\n')
    .map(line => line.trim())
    .map(line => (line.startsWith('@') ? line : line.replace(/(\s|\t|\n)/g, '')))
    .join('')}
      
  <g>
    <use href="#{id}"/>
  </g>
</svg>`;

// Log messages
export const MESSAGE_ENV_VARS_MISSING_ERROR = coloredLogMessage(
  '<red>Environment variables are not defined. Please check your .env file and compare it to the .template.env. Are there any variables missing or undefined?</red>',
);
