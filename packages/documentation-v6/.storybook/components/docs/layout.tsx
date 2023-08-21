import React from 'react';

import { DocsContainer as Layout } from '@storybook/addon-docs/blocks';
import Header from './header';
import Footer from './footer';
import './layout.scss';

import { useDarkMode } from 'storybook-dark-mode';
import postThemes from '../../post-themes';

const showFooter = () => {
  return window.location !== window.parent.location;
};

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
                theme: useDarkMode() ? postThemes.dark : postThemes.light,
              },
            },
          };
        },
      }}
    >
      {context.id === 'home--page' ? <Header /> : null}
      <div className="container">{children}</div>
      {showFooter() ? <Footer /> : null}
    </Layout>
  );
};
