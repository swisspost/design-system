import { relative } from 'path';
import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from "@angular/core/schematics/utils/project_tsconfig_paths";
import { canMigrateFile, createMigrationProgram } from "@angular/core/schematics/utils/typescript/compiler_host";
import { NgComponentTemplateVisitor } from "@angular/core/schematics/utils/ng_component_template";
import { SourceFile } from "typescript";
import * as cheerio from 'cheerio';
import DomMigration from './migration';

export default function DomMigrationRule (migration: DomMigration): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const { buildPaths, testPaths } = await getProjectTsConfigPaths(tree);
    const basePath = process.cwd();
    
    if (!buildPaths.length && !testPaths.length) {
      throw new SchematicsException('Could not find any tsconfig file. Cannot check templates for empty routerLinks.');
    }

    for (const tsconfigPath of [...buildPaths, ...testPaths]) {
      const { program } = createMigrationProgram(tree, tsconfigPath, basePath);
      const sourceFiles = program.getSourceFiles().filter((sourceFile: SourceFile) => canMigrateFile(basePath, sourceFile, program));
      const templateVisitor = new NgComponentTemplateVisitor(program.getTypeChecker(), basePath, tree);

      sourceFiles.forEach((sourceFile: SourceFile) => templateVisitor.visitNode(sourceFile));

      for (const template of templateVisitor.resolvedTemplates) {
        const treeFilePath = relative(normalize(basePath), normalize(template.filePath));
        let sourceCode = tree.read(treeFilePath)?.toString() ?? '';

        if (!sourceCode) continue;

        for (const { selector, update } of migration.updates) {
          // create cheerio dom tree
          const $ = cheerio.load(sourceCode, {
            xmlMode: true,
            decodeEntities: false,
            lowerCaseTags: false,
            lowerCaseAttributeNames: false,
            recognizeSelfClosing: true,
            withStartIndices: true,
            withEndIndices: true
          }, false);

          // get "cheerioElement[]" to mutate in "update" method
          const $elements = $(selector);
          
          // continue to next migration.update if no elements were found
          if ($elements.length <= 0) continue;
          
          // create "cheerioElement[]" out of cheerio elements
          const elementsArray = Array.from($elements);
          // map source elements as "string[]" for later comparison
          const sourceElements = elementsArray.map(element => $(element).toString());
          // start tree file recorder to update tree file later
          const treeUpdateRecorder = tree.beginUpdate(treeFilePath);
          
          // send "cheerioElement[]" and cheerio instance to the "update" method
          // after this "cheerioElement[]" in "$elements" are updated
          update($elements, $);
          
          elementsArray
            .forEach((element, index) => {
              const $element = $(element);
              
              // continue to next "element", if eighter "element" has not been updated or "element" has no indices
              if (sourceElements[index] === $element.toString() || element.startIndex === null || element.endIndex === null) return;
              
              // remove old "element" out of tree file
              treeUpdateRecorder.remove(element.startIndex, element.endIndex- element.startIndex + 1);
              // write new "element" into the tree file
              treeUpdateRecorder.insertLeft(element.startIndex, $element.toString());
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
