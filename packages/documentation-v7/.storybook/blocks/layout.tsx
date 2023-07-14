/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { DocsContainer, DocsContainerProps, Unstyled } from '@storybook/blocks';
import React, { PropsWithChildren } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import '../styles/layout.scss';
import themes from '../styles/themes';
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
    <DocsContainer
      context={context}
      theme={useDarkMode() ? themes.dark : themes.light}
    >
      <Unstyled>
        {shouldShowHeader() && <Header/>}
        <div className="container">{children}</div>
        {shouldShowFooter() && <Footer/>}
      </Unstyled>
    </DocsContainer>
  );
};
