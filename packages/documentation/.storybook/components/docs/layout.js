import pkgDocumentation from './../../../package.json';
import pkgStyles from './../../../node_modules/@swisspost/design-system-styles/package.json';
import React from "react";

import { DocsContainer as Layout } from "@storybook/addon-docs/blocks";
import Header from './header';
import TopicTeaser from './topic-teaser';
import Footer from './footer';
import './layout.scss';

import { useDarkMode } from "storybook-dark-mode";
import postThemes from '../../post-themes';

const versionFilterRegexes = {
  major: /^(?:(\d+)\.\d+\.\d+)/,
  minor: /^(?:\d+\.(\d+)\.\d+)/,
  patch: /^(?:\d+\.\d+\.(\d+))/,
  pre: /^(?:\d+\.\d+\.\d+[ .:,;!?_~`'"^*+\-=<>#&$%@|\/()[\]{}]?(.*))/,
  majorminor: /^(?:(\d+\.\d+)\.\d+)/,
  majorminorpatch: /^(\d+\.\d+\.\d+)/
};

const versionFilterMap = {
  major: 'major',
  M: 'major',
  minor: 'minor',
  m: 'minor',
  pre: 'pre',
  majorminor: 'majorminor',
  Mm: 'majorminor',
  majorminorpatch: 'majorminorpatch',
  Mmp: 'majorminorpatch'
};

const versions = {
  documentation: pkgDocumentation.version,
  styles: pkgDocumentation.dependencies['@swisspost/design-system-styles'],
  components: pkgDocumentation.dependencies['@swisspost/design-system-components'],
  bootstrap: pkgStyles.dependencies.bootstrap,
};

console.log(versions);
export default ({ children, context }) => {
  function getCleanVersion (version = '') {
    return version.replace(/^[^\d]+/, '');
  }

  function getVersion (version, filter = '') {
    const cleanVersion = getCleanVersion(versions[version]);

    if (filter) {
      const filterRegex = versionFilterRegexes[versionFilterMap[filter]];
      let matchArray = null;

      if (filterRegex) matchArray = cleanVersion.match(filterRegex);

      return matchArray !== null && matchArray[1] ? matchArray[1] : null;
    } else {
      return cleanVersion.length > 0 ? cleanVersion : versions[version] ?? null;
    }
  }

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
      { context.id === 'welcome--page' ? <Header getVersion={ getVersion }/> : null }
      <div className="container">
        {children}
      </div>
      { context.id === 'welcome--page' ? <TopicTeaser getVersion={ getVersion }/> : null }
      <Footer/>
    </Layout>
  );
};