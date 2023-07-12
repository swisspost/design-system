import React from 'react';

import { DocsContainer as Layout, Unstyled } from '@storybook/blocks';
import Header from './header';
import Footer from './footer';
import './layout.scss';

import { useDarkMode } from 'storybook-dark-mode';
import themes from '../../themes/base';

export default ({ children, context }) => {
  return (
    <Layout
      context={{
        ...context,
        storyById: id => {
          const storyContext = context.storyById(id);

          return {
            ...storyContext,
            parameters: {
              ...storyContext.parameters,
              docs: {
                ...storyContext.parameters.docs,
                theme: useDarkMode() ? themes.dark : themes.light,
              },
            },
          };
        },
      }}
    >
      <Unstyled>
        {context.attachedCSFFile.meta.id === 'home' ? <Header /> : null}
        <div className="container">{children}</div>
        {window.location !== window.parent.location ? <Footer /> : null}
      </Unstyled>
    </Layout>
  );
};
