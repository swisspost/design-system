import { Source } from '@storybook/addon-docs/blocks';
import {
  getComponentStyleImports,
  getStyleImportsText,
  Props,
} from './styles-package-import-individual.sample';

export default function PackageTag(props: Props) {
  return (
    <>
      <h2>Style Imports</h2>
      <p>
        <small>
          *Make sure the `@swisspost/design-system-styles` package is already present in your
          project or follow the [installation
          guidelines](/?path=/docs/e53e2de8-0bbf-4f70-babc-074c5466f700--docs).*
        </small>
      </p>
      <p>To import all Design System styles:</p>
      <div className="docblock-source-all-design">
        <Source code={`@use '@swisspost/design-system-styles/post-compact.scss';`} language="css" />
      </div>
      <p>{getStyleImportsText(props)}</p>
      <Source code={getComponentStyleImports(props)} language="css" />
    </>
  );
}
