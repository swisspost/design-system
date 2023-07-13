import React from 'react';

import { DocsContainer as Layout, Unstyled } from '@storybook/blocks';
import Header from './header';
import Footer from './footer';
import './layout.scss';

function showHeader() {
  return new URLSearchParams(window.location.search).get('id') === 'home--docs';
}

function showFooter() {
  return window.location !== window.parent.location;
}

export default ({ children, context }) => (
  <Layout context={context}>
    <Unstyled>
      {showHeader() ? <Header /> : null}
      <div className="container">{children}</div>
      {showFooter() ? <Footer /> : null}
    </Unstyled>
  </Layout>
);
