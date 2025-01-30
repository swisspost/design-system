import { defineCustomElements as defineHeader } from '@swisspost/internet-header/loader/index.es2017.js';
import { defineCustomElements as defineComponents } from '@swisspost/design-system-components/loader';
import { setStencilDocJson } from '@kurbar/storybook-addon-docs-stencil';
import { StencilJsonDocs } from '@kurbar/storybook-addon-docs-stencil/dist/types';
import postComponentsDocJson from '@swisspost/design-system-components/dist/docs.json';
import internetHeaderDocJson from '@swisspost/internet-header/dist/docs.json';
import '../../src/shared/link-design/link-design.component';

defineHeader();
defineComponents();

if (postComponentsDocJson && internetHeaderDocJson) {
  const { components, ...docJsonMetaData } = postComponentsDocJson as unknown as StencilJsonDocs;

  // add the internet header components to the post component list
  const allComponents = components.concat(
    (internetHeaderDocJson as unknown as StencilJsonDocs).components,
  );

  // parse the component properties to show a deprecation message necessary
  allComponents.forEach(component => {
    component.props.forEach(prop => {
      if (prop.deprecation) {
        const deprecationAlert = `<span className="mb-4 banner banner-warning banner-sm">**Deprecated:** ${prop.deprecation}</span>`;
        prop.docs = `${prop.deprecation ? deprecationAlert : ''}${prop.docs}`;
      }
    });
  });

  const stencilJsonDocs: StencilJsonDocs = {
    ...docJsonMetaData,
    components: allComponents,
  };

  setStencilDocJson(stencilJsonDocs);
}
