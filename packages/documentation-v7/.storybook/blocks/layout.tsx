import { DocsContainer, DocsContainerProps, Unstyled } from '@storybook/blocks';
import React, { PropsWithChildren } from 'react';
import '../styles/layout.scss';
import Footer from './footer';
import Header from './header';

function shouldShowHeader() {
  return new URLSearchParams(window.location.search).get('id') === 'home--docs';
}

function shouldShowFooter() {
  return window.location !== window.parent.location;
}

export default ({ children, context }: PropsWithChildren<DocsContainerProps>) => {
  return (
    <DocsContainer context={context}>
      <Unstyled>
        {shouldShowHeader() && <Header/>}
        <div className="container">{children}</div>
        {shouldShowFooter() && <Footer/>}
      </Unstyled>
    </DocsContainer>
  );
};
