import { Source } from '@storybook/addon-docs/blocks';
import { useEffect, useState } from 'react';
import {
  getComponentStyleImports,
  getStyleImportsText,
  Props,
} from './styles-package-import-individual.sample';
import { PostIcon } from '@swisspost/design-system-components-react';
import { getDocsGlobals, subscribeDocsGlobals } from '@root/.storybook/helpers/shell-bridge';
import type { DocsGlobals } from '@root/shell/src/storybook/docs-globals';

const getAllStylesImport = ({ theme, appearance }: DocsGlobals) => {
  return `@use '@swisspost/design-system-styles/${theme}-${appearance}.scss';`;
};

export default function PackageTag(props: Props) {
  // the theme and appearance chosen in the documentation toolbar
  const [globals, setGlobals] = useState<DocsGlobals>(getDocsGlobals);
  const allStylesImport = getAllStylesImport(globals);

  useEffect(() => subscribeDocsGlobals(setGlobals), []);

  return (
    <>
      <h2 id="style-imports" className="docs-autolink">
        Style Imports
        <a aria-hidden="true" tabIndex={-1} href="#style-imports">
          <PostIcon name="link"></PostIcon>
        </a>
      </h2>
      <p>
        <small>
          <strong>
            Make sure the <code>@swisspost/design-system-styles</code> package is already present in
            your project or follow the&nbsp;
            <a href="/?path=/docs/e53e2de8-0bbf-4f70-babc-074c5466f700--docs">
              installation guidelines
            </a>
            .
          </strong>
        </small>
      </p>
      <p>To import all Design System styles:</p>
      <div className="docblock-source-all-design">
        <Source key={allStylesImport} code={allStylesImport} language="css" />
      </div>
      <p>{getStyleImportsText(props)}</p>
      <Source code={getComponentStyleImports(props)} language="css" />
    </>
  );
}
