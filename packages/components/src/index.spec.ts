import * as fs from 'fs';
import * as path from 'path';

const file = fs.readFileSync('./src/index.ts').toString();
const componentExports = Array.from(file.matchAll(/\/(post-[a-z-]+)';$/gm)).map(m => m[1]);
const componentDefinitions = getComponentDefinitions('./src/components');

function getComponentDefinitions(dir: string, files: string[] = []) {
  const fileList = fs.readdirSync(dir);

  for (const file of fileList) {
    const filePath = `${dir}/${file}`;
    const parsed = path.parse(filePath);

    if (fs.statSync(filePath).isDirectory()) {
      getComponentDefinitions(filePath, files);
    } else if (parsed.ext === '.tsx') {
      files.push(parsed.name);
    }
  }

  return files;
}

describe('packages/components/src/index.ts', () => {
  componentDefinitions.forEach(def => {
    const component = componentExports.find(exp => exp === def);

    it(`should export component "${def}"`, () => {
      expect(component).toBeDefined();
    });
  });
});
