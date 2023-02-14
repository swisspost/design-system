import React from "react";

import { DocsContainer as Layout } from "@storybook/addon-docs/blocks";
import Header from './header';
import Footer from './footer';
import './layout.scss';

import { useDarkMode } from "storybook-dark-mode";
import postThemes from '../../post-themes';

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
      { context.id === 'welcome--page' ? <Header/> : null }
      <div className="container">
        {children}
      </div>
      <Footer/>
    </Layout>
  );
};