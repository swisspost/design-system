import { useSyncExternalStore } from 'react';
import { Source } from '@storybook/addon-docs/blocks';
import {
  getComponentStyleImports,
  getStyleImportsText,
  Props,
} from './styles-package-import.utils';
import { PostIcon } from '@swisspost/design-system-components-react';
import { globalsHost } from '@preview/globals/globals-host';

function subscribeGlobals(onChange: VoidFunction): VoidFunction {
  globalsHost.addEventListener('globals-change', onChange);
  return () => globalsHost.removeEventListener('globals-change', onChange);
}

export default function PackageTag(props: Props) {
  const { theme, appearance } = useSyncExternalStore(subscribeGlobals, () => globalsHost.current);
  const stylesheet = `@swisspost/design-system-styles/${theme}-${appearance}.scss`;

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
            <a href="/bookmark?page=e53e2de8-0bbf-4f70-babc-074c5466f700">
              installation guidelines
            </a>
            .
          </strong>
        </small>
      </p>
      <p>To import all Design System styles:</p>
      <div className="docblock-source-all-design">
        <Source key={stylesheet} code={`@use '${stylesheet}';`} language="css" />
      </div>
      <p>{getStyleImportsText(props)}</p>
      <Source code={getComponentStyleImports(props)} language="css" />
    </>
  );
}
