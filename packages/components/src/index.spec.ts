import * as fs from 'fs';
import * as entryExports from './index';

const componentExports = Object.keys(entryExports).filter(e => /^Post[A-Z]/.test(e));

// TODO: try to find a better solution to get the components definitions
const componentDefinitions = fs.readdirSync('./src/components').map((name: string) =>
  name
    .split('-')
    .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(''),
);

describe('Index.js', () => {
  componentDefinitions.forEach(d => {
    const component = componentExports.find(e => e === d);

    it(`should export component "${d}"`, () => {
      expect(component).toBeDefined();
    });
  });
});
