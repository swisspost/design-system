export const SOURCE_PATH = 'src/icons';
export const OUTPUT_PATH = 'public';

export const ICON_V2_SIZES = [16, 24, 32, 40, 48, 64];

export const ID_PREFIX = 'i';
export const ID_SEPERATOR = '-';
export const ID_UNWANTED_PARTS = ['shape'];
export const ID_SYMBOL_PREFIX = 's';
export const ID_SYMBOL_SEPERATOR = '';

export const ICON_SIZE_VAR_NAME = 'pis';

export const ICON_V1_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    {symbols}
  </defs>

  {uses}
</svg>`;

const ICON_V2_CONTAINER_STYLES = ICON_V2_SIZES.map((size, i) => {
  const nextSize = ICON_V2_SIZES[i + 1];
  const min = i !== 0 && `(min-width: ${size}px)`;
  const max = i < ICON_V2_SIZES.length - 1 && `(max-width: ${nextSize - 1}px)`;

  return `@container pi ${[min, max].filter(Boolean).join(' and ')} {
    g {
      --pis-${size}: block;
    }
  }`;
});

const ICON_V2_TEMPLATE_STYLES = `<style>
  svg {
    container-name: pi;
    container-type: inline-size;
    display: block;
    width: 100%;
    height: 100%;
  }

  ${ICON_V2_CONTAINER_STYLES.join('\n')}
</style>`;

export const ICON_V2_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  ${ICON_V2_TEMPLATE_STYLES.split('\n')
    .map(line => line.trim())
    .map(line => (line.startsWith('@') ? line : line.replace(/(\s|\t|\n)/g, '')))
    .join('')}
  <defs>
    <symbol id="{id}">
      <defs>
        {symbols}
      </defs>

      {uses}
    </symbol>
  </defs>

  <g>
    <use href="#{id}"/>
  </g>
</svg>`;
