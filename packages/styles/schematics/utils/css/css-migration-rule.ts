import {logging, normalize} from '@angular-devkit/core';
import {Rule, SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {loadEsmModule} from "@angular/core/schematics/utils/load_esm";
import {NgComponentTemplateVisitor, ResolvedTemplate} from "@angular/core/schematics/utils/ng_component_template";
import {parseHtmlGracefully} from "@angular/core/schematics/utils/parse_html";
import {getProjectTsConfigPaths} from "@angular/core/schematics/utils/project_tsconfig_paths";
import {canMigrateFile, createMigrationProgram} from "@angular/core/schematics/utils/typescript/compiler_host";
import {relative} from 'path';
import {SourceFile} from "typescript";
import {CssMigration} from "./css-migration";
import {CssClassesVisitor, Replacement} from "./html_css_classes_visitor";

type Logger = logging.LoggerApi;

interface FixedTemplate {
  originalTemplate: ResolvedTemplate;
  replacements: Replacement[];
}

/** Entry point for the CSS migration. */
export function getCssMigrationRule(cssMigration: CssMigration): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const {buildPaths, testPaths} = await getProjectTsConfigPaths(tree);
    const basePath = process.cwd();

    if (!buildPaths.length && !testPaths.length) {
      throw new SchematicsException('Could not find any tsconfig file. Cannot check templates for empty routerLinks.');
    }

    let compilerModule;
    try {
      compilerModule = await loadEsmModule<typeof import('@angular/compiler')>('@angular/compiler');
    } catch (e) {
      throw new SchematicsException(`Unable to load the '@angular/compiler' package. Details: ${(e as Error).message}`);
    }

    for (const tsconfigPath of [...buildPaths, ...testPaths]) {
      runCssMigration(cssMigration, tree, tsconfigPath, basePath, context.logger, compilerModule);
    }
  };
}

/**
 * Runs the CSS migration, updating CSS classes base on given configuration
 */
function runCssMigration(cssMigration: CssMigration, tree: Tree, tsconfigPath: string, basePath: string, logger: Logger, compilerModule: typeof import('@angular/compiler')) {
  const {program} = createMigrationProgram(tree, tsconfigPath, basePath);
  const typeChecker = program.getTypeChecker();
  const templateVisitor = new NgComponentTemplateVisitor(typeChecker, basePath, tree);
  const sourceFiles = program.getSourceFiles()
      .filter((sourceFile: SourceFile) => canMigrateFile(basePath, sourceFile, program));

  sourceFiles.forEach((sourceFile: SourceFile) => templateVisitor.visitNode(sourceFile));

  const {resolvedTemplates} = templateVisitor;
  updateOutdatedCss(cssMigration, resolvedTemplates, tree, logger, compilerModule);
}

function updateOutdatedCss(cssMigration: CssMigration, resolvedTemplates: ResolvedTemplate[], tree: Tree, logger: Logger, compilerModule: typeof import('@angular/compiler')) {
  const basePath = process.cwd();
  const fixesByFile = getFixesByFile(cssMigration, resolvedTemplates, compilerModule);

  for (const [absFilePath, templateFixes] of fixesByFile) {
    const treeFilePath = relative(normalize(basePath), normalize(absFilePath));
    const originalFileContent = tree.read(treeFilePath)?.toString();
    if (originalFileContent === undefined) {
      logger.error(`Failed to read file containing template; cannot apply CSS changes in ${treeFilePath}.`);
      continue;
    }

    const updater = tree.beginUpdate(treeFilePath);
    for (const templateFix of templateFixes) {
      templateFix.replacements.sort((a, b) => b.start - a.start);
      for (const replacement of templateFix.replacements) {
        updater.remove(replacement.start, replacement.end - replacement.start);
        updater.insertLeft(replacement.start, replacement.newContent);
      }
      tree.commitUpdate(updater);
    }
  }
}

/**
 * Returns fixes for nodes in templates which use lft and right CSS classes, grouped by file.
 */
function getFixesByFile(cssMigration: CssMigration, templates: ResolvedTemplate[], compilerModule: typeof import('@angular/compiler')): Map<string, FixedTemplate[]> {
  const fixesByFile = new Map<string, FixedTemplate[]>();
  for (const template of templates) {
    const templateFix = updateOutdatedCssInTemplate(cssMigration, template, compilerModule);
    if (templateFix === null) {
      continue;
    }

    const file = template.filePath;
    if (fixesByFile.has(file)) {
      if (template.inline) {
        fixesByFile.get(file)!.push(templateFix);
      }
    } else {
      fixesByFile.set(file, [templateFix]);
    }
  }

  return fixesByFile;
}

function updateOutdatedCssInTemplate(cssMigration: CssMigration, template: ResolvedTemplate, compilerModule: typeof import('@angular/compiler')): FixedTemplate|null {
  const templateNodes = parseHtmlGracefully(template.content, template.filePath, compilerModule);

  if (!templateNodes) {
    return null;
  }

  const visitor = new CssClassesVisitor(cssMigration, compilerModule);
  visitor.visitAll(templateNodes);

  if (!visitor.replacements || visitor.replacements.length === 0) {
    return null;
  }

  return {originalTemplate: template, replacements: visitor.replacements};
}
