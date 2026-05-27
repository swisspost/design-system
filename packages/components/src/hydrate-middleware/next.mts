const importPath = './index.mjs';
const hydrate =
  // eslint-disable-next-line unicorn/prefer-global-this
  typeof window === 'undefined' ? await import(importPath) : Promise.resolve({});

export const renderToString = hydrate?.renderToString;
export const serializeProperty = hydrate?.serializeProperty;
export const deserializeProperty = hydrate?.deserializeProperty;
export const hydrateDocument = hydrate?.hydrateDocument;
export const createWindowFromHtml = hydrate?.createWindowFromHtml;
export const serializeDocumentToString = hydrate?.serializeDocumentToString;
export const setTagTransformer = hydrate?.setTagTransformer;
export const streamToString = hydrate?.streamToString;
export const transformTag = hydrate?.transformTag;
