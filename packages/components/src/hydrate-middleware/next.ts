/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable unicorn/prefer-module */
const importPath = './index.js';
const hydrate =
  // eslint-disable-next-line unicorn/prefer-global-this
  typeof window === 'undefined' ? require(importPath) : Promise.resolve({});

exports.renderToString = hydrate?.renderToString;
exports.serializeProperty = hydrate?.serializeProperty;
exports.deserializeProperty = hydrate?.deserializeProperty;
exports.hydrateDocument = hydrate?.hydrateDocument;
exports.createWindowFromHtml = hydrate?.createWindowFromHtml;
exports.serializeDocumentToString = hydrate?.serializeDocumentToString;
exports.setTagTransformer = hydrate?.setTagTransformer;
exports.streamToString = hydrate?.streamToString;
exports.transformTag = hydrate?.transformTag;
