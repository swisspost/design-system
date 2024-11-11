export const SOURCE_PATH = 'src/icons';
export const OUTPUT_PATH = 'public';

export const ICON_V2_SIZES = [16, 24, 32, 40, 48, 64];

export const ID_PREFIX = 'i';
export const ID_SEPERATOR = '-';
export const ID_SYMBOL_PREFIX = 's';
export const ID_SYMBOL_SEPERATOR = '';

export const ICON_SIZE_VAR_NAME = 'pis';

export const ICON_V1_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    {symbols}
  </defs>
</svg>`;

export const ICON_V2_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="{id}">
      <defs>
        {symbols}
      </defs>

      {uses}
    </symbol>
  </defs>
</svg>`;
