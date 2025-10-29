import { DocsContainer, DocsContainerProps, Unstyled } from '@storybook/addon-docs/blocks';
import { PropsWithChildren } from 'react';
import './layout.scss';
import Footer from '../footer';
import BetaBanner from '../beta-banner';
import Header from '../header';
import { ifDefined } from 'lit/directives/if-defined.js';

function shouldShowHeader() {
  return new URLSearchParams(window.location.search).get('id') === 'introduction--docs';
}

function shouldShowFooter() {
  return window.location !== window.parent.location;
}

export default (props: PropsWithChildren<DocsContainerProps>) => {
  const { children, context } = props;
  const container =
    context.channel.data.docsPrepared[0].parameters.layout === 'fullscreen'
      ? 'container-fluid'
      : 'container';
  const pathToStoryFile = context?.storyIdToCSFFile?.values()?.next()?.value?.meta
    ?.parameters?.fileName;
  return (
    <DocsContainer context={context}>
      <Unstyled>
        <BetaBanner />
        {shouldShowHeader() && <Header />}
        <div className={container + (!shouldShowHeader() && ' docs-container')}>{children}</div>
        {shouldShowFooter() && <Footer pathToStoryFile={ifDefined(pathToStoryFile)} />}
      </Unstyled>
    </DocsContainer>
  );
};
