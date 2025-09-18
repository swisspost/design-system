import {
  Title,
  Description,
  Canvas,
  Controls,
  Stories,
  Source
} from '@storybook/addon-docs/blocks';

import { useOf } from '@storybook/addon-docs/blocks';
import { getTitleFromPath } from '@/utils';

export const Imports = ({ of }) => {
  const story = useOf(of || 'story', ['story']).story;

  return (
    <>
      <h2>Imports</h2>

      <p>
          Make sure the <code>@swisspost/design-system-styles</code> package is already present in your project or follow the <a href="/?path=/docs/e53e2de8-0bbf-4f70-babc-074c5466f700--docs">installation guidelines</a>.
      </p>

      <p>To import all Design System styles:</p>
      <Source code={`@use '@swisspost/design-system-styles/post-compact.scss';`} language="scss" />

      <p>To import only the styles required for this component:</p>
      <Source
        code={`@use '@swisspost/design-system-styles/basics.scss';\n@use '@swisspost/design-system-styles/components/${story.component}.scss';`}
        language="scss"
      />
    </>
);
};

export const DesignLink = ({ of }) => {
  const story = useOf(of || 'story', ['story']).story;

  return (
    <a className="figma-link btn btn-primary" href={story.parameters.design.url}>
      <img
        src="/assets/images/technologies/logo-figma.svg"
        alt=""
        style={{width: '0.8rem', height: '0.8rem'}}
      />
      <span>
        Figma Design
        <span className="visually-hidden"> for ${getTitleFromPath(story.title)} component</span>
      </span>
    </a>
  );
};


export default () => {
  return (
    <>

      <div className="docs-title">
        <Title />

        <DesignLink />
      </div>

      <div className="lead">
        <Description />
      </div>

      <Canvas sourceState="shown" />
      <div className="hide-col-default">
        <Controls />
      </div>

      <Imports />

      <Stories title="Examples" includePrimary={false} />
    </>
  );
};
