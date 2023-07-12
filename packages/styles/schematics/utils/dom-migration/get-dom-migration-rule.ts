import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NgComponentTemplateVisitor } from '@angular/core/schematics/utils/ng_component_template';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { canMigrateFile, createMigrationProgram } from '@angular/core/schematics/utils/typescript/compiler_host';
import * as cheerio from 'cheerio/lib/slim';
import { relative } from 'path';
import * as prettier from 'prettier';
import htmlParser from 'prettier/plugins/html';
import { SourceFile } from 'typescript';
import { DomUpdate } from './dom-update';

// cheerio/lib/slim export uses htmlparser2 to parse the html
// this is why we can use htmlparser2 options here (instead of parse5 options)
const CHEERIO_OPTIONS: cheerio.CheerioOptions = {
  decodeEntities: false,
  lowerCaseTags: false,
  lowerCaseAttributeNames: false,
  recognizeSelfClosing: true,
  withStartIndices: true,
  withEndIndices: true,
};

const PRETTIER_OPTIONS: prettier.Options = {
  parser: 'html',
  plugins: [ htmlParser],
  printWidth: 10000,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'off',
  singleAttributePerLine: true,
};

export function getDomMigrationRule(...updates: DomUpdate[]): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const { buildPaths, testPaths } = await getProjectTsConfigPaths(tree);
    const basePath = process.cwd();

    if (!buildPaths.length && !testPaths.length) {
      throw new SchematicsException('Could not find any tsconfig file. Cannot check templates for empty routerLinks.');
    }

    for (const tsconfigPath of [ ...buildPaths, ...testPaths ]) {
      const { program } = createMigrationProgram(tree, tsconfigPath, basePath);
      const sourceFiles = program.getSourceFiles()
        .filter((sourceFile: SourceFile) => canMigrateFile(basePath, sourceFile, program));
      const templateVisitor = new NgComponentTemplateVisitor(program.getTypeChecker(), basePath, tree);

      sourceFiles.forEach((sourceFile: SourceFile) => templateVisitor.visitNode(sourceFile));

      for (const template of templateVisitor.resolvedTemplates) {
        const treeFilePath = relative(normalize(basePath), normalize(template.filePath));
        let sourceCode = tree.read(treeFilePath)?.toString() ?? '';

        if (!sourceCode) {
          continue;
        }

        for (const [ updateKey, { update, selector } ] of Object.entries(updates)) {
          // get update class context
          const context = updates[Number(updateKey)];

          // create cheerio dom tree
          const $ = cheerio.load(sourceCode, CHEERIO_OPTIONS, false);

          // get "cheerioElement[]" to mutate in "update" method and add cheerio-identifier to each of em
          const $inputElements = $(selector).each((i, element) => {
            $(element).data('cheerio-id', i);
          });

          // continue to next update if no elements were found
          if ($inputElements.length <= 0) {
            continue;
          }

          // map elements to sourceElements for later comparison
          const sourceElements = Array.from($inputElements)
            .map((element, index) => ({
              id: index,
              element: $(element).toString(),
              start: element.startIndex ?? null,
              end: element.endIndex ? element.endIndex + 1 : null,
            }));

          // send "cheerioElement[]" and cheerio instance to the "update" method
          // after this "cheerioElement[]" in "$elements" are updated
          update.bind(context)($inputElements, $);

          // get updated elements from dom tree
          const $outputElements = $('*').filter((_i, element) => $(element).data('cheerio-id') !== undefined);

          // start tree file recorder to update tree file later
          const treeUpdateRecorder = tree.beginUpdate(treeFilePath);

          sourceElements
            .forEach(async source => {
              // get corresponding outputelement by cheerio-id
              const distElement = $outputElements.filter((_i, element) => $(element).data('cheerio-id') === source.id)
                .first()
                .toString();

              // continue to next "element", if eighter "element" has not been updated or "element" has no indices
              if (source.element === distElement || source.start === null || source.end === null) {
                return;
              }

              // remove old "element" out of tree file
              treeUpdateRecorder.remove(source.start, source.end - source.start);
              // write new "element" into the tree file


              const content = await prettier.format(distElement, PRETTIER_OPTIONS);
              const contentWithoutBreak = content.replace(/(\n|\r\n)$/, '');

              treeUpdateRecorder.insertLeft(
                source.start,
                contentWithoutBreak
              );
            });

          // commit changes in tree file to tree
          tree.commitUpdate(treeUpdateRecorder);
          // update "sourceCode" for chained "DomUpdates" in same migration schematic
          sourceCode = tree.read(treeFilePath)?.toString() ?? '';
        }
      }
    }
  };
}
