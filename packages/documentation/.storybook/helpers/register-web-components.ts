import { defineCustomElements as defineInternetHeader } from '@swisspost/internet-header/loader';
import { defineCustomElements as definePostComponents } from '@swisspost/design-system-components/loader';
import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import {
  StencilJsonDocs,
  StencilJsonDocsComponent,
} from '@pxtrn/storybook-addon-docs-stencil/dist/types';
import postComponentsDocJson from '@swisspost/design-system-components/dist/docs.json';
import internetHeaderDocJson from '@swisspost/internet-header/dist/docs.json';

defineInternetHeader(window);
definePostComponents(window);

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
