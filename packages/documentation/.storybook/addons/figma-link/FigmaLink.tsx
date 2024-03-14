import React from 'react';
import { useStorybookApi } from '@storybook/manager-api';

import logoFigma from '../../../public/assets/images/technologies/logo-figma.svg';
import { getTitleFromPath } from '../../../src/utils';

function FigmaLink() {
  const api = useStorybookApi();
  const designParameter = api.getCurrentParameter<{ type: string; url: string }>('design') || [];
  const titlePath = api.getCurrentStoryData()?.title;

  return designParameter?.type === 'figma' && designParameter?.url ? (
    <a className="figma-link btn btn-primary btn-sm btn-icon" href={designParameter.url}>
      <img src={logoFigma} alt="" />
      <span>
        Figma Design
        <span className="visually-hidden"> for {getTitleFromPath(titlePath)} component</span>
      </span>
    </a>
  ) : null;
}

export default FigmaLink;
