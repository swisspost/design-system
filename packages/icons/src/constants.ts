export const SOURCE_PATH = 'src/icons';
export const OUTPUT_PATH = 'public';

export const ICON_V2_SIZES = [16, 24, 32, 40, 48, 64];

export const ID_PREFIX = 'i';
export const ID_SEPERATOR = '-';
export const ID_UNWANTED_PARTS = ['shape'];
export const ID_SYMBOL_PREFIX = 's';
export const ID_SYMBOL_SEPERATOR = '';

export const ICON_V1_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    {symbols}
  </defs>
  {uses}
</svg>`;

const ICON_V2_TEMPLATE_STYLES = `<style>
  ${ICON_V2_SIZES.map((size, i) => {
    const query = [];

    if (i > 0) query.push(`(min-width: ${ICON_V2_SIZES[i]}px)`);
    if (i < ICON_V2_SIZES.length - 1) query.push(`(max-width: ${ICON_V2_SIZES[i + 1] - 0.02}px)`);

    return `@media ${query.join(' and ')} {
      g {
        --${ID_SYMBOL_PREFIX}${size}: block;
      }
    }`;
  }).join('\n\n')}
  </style>`;

export const ICON_V2_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="{id}">
      {symbols}
      {uses}
    </symbol>
  </defs>
  
  ${ICON_V2_TEMPLATE_STYLES.split('\n')
    .map(line => line.trim())
    .map(line => (line.startsWith('@') ? line : line.replace(/(\s|\t|\n)/g, '')))
    .join('')}
      
  <g>
    <use href="#{id}"/>
  </g>
</svg>`;
