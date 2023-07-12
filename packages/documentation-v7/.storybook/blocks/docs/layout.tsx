import React from 'react';

import { DocsContainer as Layout, Unstyled } from '@storybook/blocks';
import Header from './header';
import Footer from './footer';
import './layout.scss';

export default ({ children, context }) => (
  <Layout context={context}>
    <Unstyled>
      {context.attachedCSFFile?.meta.id === 'home' ? <Header /> : null}
      <div className="container">{children}</div>
      {window.location !== window.parent.location ? <Footer /> : null}
    </Unstyled>
  </Layout>
);
