import { Source } from '@storybook/addon-docs/blocks';
import { useEffect, useState } from 'react';
import {
  getComponentStyleImports,
  getStyleImportsText,
  Props,
} from './styles-package-import.utils';
import { PostIcon } from '@swisspost/design-system-components-react';
import { addons } from 'storybook/preview-api';
import { STYLES_CHANGED_EVENT, type StylesChangedPayload } from '@shared/channel';

type StyleSelection = StylesChangedPayload;

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
    const channel = addons.getChannel();
    const updateStyleSelection = (selection: StyleSelection) => setStyleSelection(selection);

    channel.on(STYLES_CHANGED_EVENT, updateStyleSelection);

    return () => channel.off(STYLES_CHANGED_EVENT, updateStyleSelection);
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
