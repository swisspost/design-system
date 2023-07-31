import { defineCustomElements as defineInternetHeader } from '@swisspost/internet-header/loader';
import { defineCustomElements as definePostComponent } from '@swisspost/design-system-components/loader';
import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import { StencilJsonDocs } from '@pxtrn/storybook-addon-docs-stencil/dist/types';
import internetHeaderDocJson from '@swisspost/internet-header/dist/docs.json';
import postComponentsDocJson from '@swisspost/design-system-components/dist/docs.json';

defineInternetHeader(window);
definePostComponent(window);

if (internetHeaderDocJson) setStencilDocJson(internetHeaderDocJson as StencilJsonDocs);
if (postComponentsDocJson) setStencilDocJson(postComponentsDocJson as StencilJsonDocs);
