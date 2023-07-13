import { DocsContainer, DocsContainerProps, Unstyled } from '@storybook/blocks';
import React, { PropsWithChildren } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import postThemes from '../../post-themes';
import Footer from './footer';
import Header from './header';
import './layout.scss';

const shouldShowHeader = () => {
  return new URLSearchParams(window.location.search).get('id') === 'home--docs';
};

const shouldShowFooter = () => {
  return window.location !== window.parent.location;
};

export default ({ children, context }: PropsWithChildren<DocsContainerProps>) => {
  return (
    <DocsContainer
      context={context}
      theme={useDarkMode() ? postThemes.dark : postThemes.light}
    >
      <Unstyled>
        {shouldShowHeader() && <Header/>}
        <div className="container">{children}</div>
        {shouldShowFooter() && <Footer/>}
      </Unstyled>
    </DocsContainer>
  );
};
