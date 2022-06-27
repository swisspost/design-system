import {TmplAstBoundAttribute, TmplAstTextAttribute} from "@angular/compiler";
import type {TmplAstElement, TmplAstTemplate} from '@angular/compiler';
import {TemplateAstVisitor} from "@angular/core/schematics/utils/template_ast_visitor";
import {CssMigration} from "./css-migration";

export interface Replacement {
    start: number;
    end: number;
    newContent: string;
}

/**
 * HTML AST visitor that traverses the Render3 HTML AST in order to find all outdated CSS classes.
 */
export class CssClassesVisitor extends TemplateAstVisitor {
    readonly replacements: Replacement[] = [];

    constructor(private cssMigration: CssMigration, compilerModule: typeof import('@angular/compiler')) {
        super(compilerModule);
    }

    override visitElement(element: TmplAstElement): void {
        this.visitAll(element.attributes); // text attributes
        this.visitAll(element.inputs); // bound attributes
        this.visitAll(element.children);
    }

    override visitTemplate(t: TmplAstTemplate): void {
        this.visitAll(t.attributes); // text attributes
        this.visitAll(t.inputs); // bound attributes
        this.visitAll(t.children);
    }

    override visitBoundAttribute(node: TmplAstBoundAttribute) {
        // check classes bound using [class.someClassName] directive
        if (node.keySpan?.details?.startsWith('class.') && this.cssMigration.evaluate(node.name)) {
            this.replacements.push({
                start: node.keySpan.start.offset,
                end: node.keySpan.end.offset,
                newContent: 'class.' + this.cssMigration.apply(node.name)
            });
        }

        // check classes bound using [ngClass] directive
        if (node.name === 'ngClass' && node.value instanceof this.compilerModule.ASTWithSource) {
            const ast = node.value.ast;


            if (ast instanceof this.compilerModule.LiteralPrimitive) { // bounded value is a string
                this.replacements.push({
                    start: ast.sourceSpan.start + 1, // +1 for the opening quote mark
                    end: ast.sourceSpan.end - 1, // -1 for the closing quote mark
                    newContent: this.cssMigration.apply(ast.value)});

            } else if (ast instanceof this.compilerModule.LiteralArray) { // bounded value is an array of strings
                ast.expressions
                    .filter(expr => this.cssMigration.evaluate(expr.value))
                    .forEach(expr => this.replacements.push({
                        start: expr.sourceSpan.start + 1, // +1 for the opening quote mark
                        end: expr.sourceSpan.end - 1, // -1 for the closing quote mark
                        newContent: this.cssMigration.apply(expr.value)
                    }));

            } else if (ast instanceof this.compilerModule.LiteralMap) { // bounded value is an object
                const source = node.value.source || '';
                ast.keys
                    .filter(expr => this.cssMigration.evaluate(expr.key))
                    .forEach((expr, i) => {
                        const valueStart = ast.values[i].span.start;
                        const keyStart = source.lastIndexOf(expr.key, valueStart);
                        const offset = ast.sourceSpan.start;
                        this.replacements.push({
                            start: keyStart + offset,
                            end: keyStart + expr.key.length + offset,
                            newContent: this.cssMigration.apply(expr.key)
                        });
                    });
            }
        }
    }

    override visitTextAttribute(node: TmplAstTextAttribute) {
        // check basic class attributes
        if (node.name === 'class' && node.valueSpan && this.cssMigration.evaluate(node.value)) {
            this.replacements.push({
                start: node.valueSpan.start.offset,
                end: node.valueSpan.end.offset,
                newContent: this.cssMigration.apply(node.value)
            });
        }
    }
}
