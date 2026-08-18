/**
 * Stencil configuration for playground.
 * Only the www output target is required!
 */

import { Config } from '@stencil/core';
import { config as baseConfig } from './stencil.config';

const outputTargets = baseConfig.outputTargets || [];

export const config: Config = {
  ...baseConfig,
  buildDist: false,
  outputTargets: [...outputTargets.filter(t => t.type === 'www')],
};
