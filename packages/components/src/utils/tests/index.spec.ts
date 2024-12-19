import * as fs from 'fs';

const file = fs.readFileSync('./src/utils/index.ts').toString();
const exportModuleMatches = file.matchAll(/^export \* from '(?:\.\/)?(.*)';$/gm);
const exportModuleNames = [...exportModuleMatches].map(m => m[1]);
const exportModuleExceptionNames = ['breakpoint'];

describe('packages/components/src/utils/index.ts', () => {
  exportModuleExceptionNames.forEach(moduleName => {
    const exportModuleName = exportModuleNames.find(m => m === moduleName);

    it(`should NOT export utility "${moduleName}"`, () => {
      expect(exportModuleName).toBeUndefined();
    });
  });
});
