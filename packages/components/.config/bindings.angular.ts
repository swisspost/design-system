import { ValueAccessorConfig } from '@stencil/angular-output-target';

// https://stenciljs.com/docs/v4/angular#valueaccessorconfigs
export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['post-card-control[type="checkbox"]'],
    event: 'change',
    targetAttr: 'checked',
    type: 'boolean',
  },
  // a custom post-card-control-value-accessor for post-card-control[type="radio"] has been implemented in the components-angular package
];
