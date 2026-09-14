import { Source } from '@storybook/addon-docs/blocks';
import { useEffect, useState } from 'react';
import {
  getComponentStyleImports,
  getStyleImportsText,
  Props,
} from './styles-package-import-individual.sample';
import { PostIcon } from '@swisspost/design-system-components-react';

const STYLE_SWITCHER_EVENT = 'swisspost-documentation-style-change';

type StyleSelection = {
  theme: string;
  appearance: string;
};

type StyleSelectionEvent = CustomEvent<StyleSelection>;

const getAllStylesImport = ({ theme, appearance }: StyleSelection) => {
  return `@use '@swisspost/design-system-styles/${theme.toLowerCase()}-${appearance.toLowerCase()}.scss';`;
};

export default function PackageTag(props: Props) {
  const [styleSelection, setStyleSelection] = useState<StyleSelection>({
    theme: 'Post',
    appearance: 'Compact',
  });
  const allStylesImport = getAllStylesImport(styleSelection);

  useEffect(() => {
    const updateStyleSelection = (event: Event) => {
      setStyleSelection((event as StyleSelectionEvent).detail);
    };

    window.addEventListener(STYLE_SWITCHER_EVENT, updateStyleSelection);

    return () => window.removeEventListener(STYLE_SWITCHER_EVENT, updateStyleSelection);
  }, []);

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
