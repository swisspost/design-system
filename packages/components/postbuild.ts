import fs from 'fs';
import path from 'path';

interface IGlobalStylePaths {
  source: string;
  output: string;
}

function copyGlobalStyles() {
  const SOURCE_PATH = path.resolve('./dist/post-components/post-components.css');
  const PATHS: IGlobalStylePaths[] = [
    {
      source: SOURCE_PATH,
      output: path.resolve(
        '../components-react/src/components/stencil-generated/post-components.css',
      ),
    },
    {
      source: SOURCE_PATH,
      output: path.resolve(
        '../components-angular/projects/components/src/lib/stencil-generated/post-components.css',
      ),
    },
  ];

  PATHS.forEach(({ source, output }) => {
    fs.copyFileSync(source, output);
  });
}

function postbuild() {
  copyGlobalStyles();
}

postbuild();
