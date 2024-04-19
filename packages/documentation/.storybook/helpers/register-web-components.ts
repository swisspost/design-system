// @ts-ignore
import {
  applyPolyfills as headerPolyfills,
  defineCustomElements as defineHeader,
} from '@swisspost/internet-header/loader/index.es2017.js';
import {
  applyPolyfills as componentsPolyfills,
  defineCustomElements as defineComponents,
} from '@swisspost/design-system-components/loader';
import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import {
  StencilJsonDocs,
  StencilJsonDocsComponent,
} from '@pxtrn/storybook-addon-docs-stencil/dist/types';
import postComponentsDocJson from '@swisspost/design-system-components/dist/docs.json';
import internetHeaderDocJson from '@swisspost/internet-header/dist/docs.json';
import '../../src/shared/link-design/link-design.component';

headerPolyfills().then(() => {
  defineHeader();
});
componentsPolyfills().then(() => {
  defineComponents();
});

if (postComponentsDocJson && internetHeaderDocJson) {
  const jsonDocs: StencilJsonDocs = {
    timestamp: postComponentsDocJson.timestamp,
    compiler: postComponentsDocJson.compiler,
    components: [
      ...postComponentsDocJson.components,
      ...internetHeaderDocJson.components,
    ] as StencilJsonDocsComponent[],
  };

  setStencilDocJson(jsonDocs);
}
