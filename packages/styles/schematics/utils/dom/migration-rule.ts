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
          const $ = cheerio.load(sourceCode, {
            xmlMode: true,
            lowerCaseTags: false,
            lowerCaseAttributeNames: false,
            recognizeSelfClosing: true,
            withStartIndices: true,
            withEndIndices: true
          }, false);

          const $elements = $(selector);
          
          if ($elements.length <= 0) continue;

          const treeUpdateRecorder = tree.beginUpdate(treeFilePath);

          Array.from($elements)
            .forEach(element => {              
              if (element.startIndex === null || element.endIndex === null) return;

              const $element = $(element);

              update($element);
              treeUpdateRecorder.remove(element.startIndex, element.endIndex- element.startIndex + 1);
              treeUpdateRecorder.insertLeft(element.startIndex, $element.toString());
            });
          
          tree.commitUpdate(treeUpdateRecorder);
          sourceCode = tree.read(treeFilePath)?.toString() ?? '';
        }
      }
    }
  };
}
