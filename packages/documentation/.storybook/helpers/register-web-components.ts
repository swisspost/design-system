import '@swisspost/design-system-components';
import { setStencilDocJson } from '@kurbar/storybook-addon-docs-stencil';
import { StencilJsonDocs } from '@kurbar/storybook-addon-docs-stencil/dist/types';
import postComponentsDocJson from '@swisspost/design-system-components/dist/docs.json';
import '../../src/shared/link-design/link-design.component';

if (postComponentsDocJson) {
  setStencilDocJson(postComponentsDocJson as unknown as StencilJsonDocs);
}
