import {TmplAstBoundAttribute, TmplAstTextAttribute} from "@angular/compiler";
import type {TmplAstElement, TmplAstTemplate} from '@angular/compiler';
import {TemplateAstVisitor} from "@angular/core/schematics/utils/template_ast_visitor";
import {CssMigration} from "./css-migration";

export interface Replacement {
    id: string,
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
        this.cssMigration.currentElement(element);

        this.visitAll(element.attributes); // text attributes
        this.visitAll(element.inputs); // bound attributes
        this.visitAll(element.children);
    }

    override visitTemplate(t: TmplAstTemplate): void {
        this.cssMigration.currentTemplate(t);

        this.visitAll(t.attributes); // text attributes
        this.visitAll(t.inputs); // bound attributes
        this.visitAll(t.children);
    }

    override visitBoundAttribute(node: TmplAstBoundAttribute) {
        // check classes bound using [class.someClassName] directive
        if (node.keySpan?.details?.startsWith('class.') && this.cssMigration.evaluate(node.name)) {
            this.setReplacement('directive', node.keySpan.start.offset, node.keySpan.end.offset, 'class.' + this.cssMigration.apply(node.name));
        }

        // check classes bound using [ngClass] directive
        if (node.name === 'ngClass' && node.value instanceof this.compilerModule.ASTWithSource) {
            const ast = node.value.ast;


            if (ast instanceof this.compilerModule.LiteralPrimitive) { // bounded value is a string
                this.setReplacement('string', ast.sourceSpan.start + 1, ast.sourceSpan.end - 1, this.cssMigration.apply(ast.value));

            } else if (ast instanceof this.compilerModule.LiteralArray) { // bounded value is an array of strings
                ast.expressions
                    .filter(expr => this.cssMigration.evaluate(expr.value))
                    .forEach(expr => {
                        this.setReplacement('string-array', expr.sourceSpan.start + 1, expr.sourceSpan.end - 1, this.cssMigration.apply(expr.value));
                    });

            } else if (ast instanceof this.compilerModule.LiteralMap) { // bounded value is an object
                const source = node.value.source || '';
                ast.keys
                    .filter(expr => this.cssMigration.evaluate(expr.key))
                    .forEach((expr, i) => {
                        const valueStart = ast.values[i].span.start;
                        const keyStart = source.lastIndexOf(expr.key, valueStart);
                        const offset = ast.sourceSpan.start;
                        this.setReplacement('object', keyStart + offset, keyStart + expr.key.length + offset, this.cssMigration.apply(expr.key));
                    });
            }
        }
    }

    override visitTextAttribute(node: TmplAstTextAttribute) {
        // check basic class attributes
        if (node.name === 'class' && node.valueSpan && this.cssMigration.evaluate(node.value)) {
            this.setReplacement('class', node.valueSpan.start.offset, node.valueSpan.end.offset, this.cssMigration.apply(node.value));
        }
    }

    private setReplacement (type: string, start: number, end: number, newContent: string) {
        const replacement = {
            id: `${type}::${start}::${end}::${newContent}`,
            start,
            end,
            newContent
        };

        if (!this.replacements.some(r => r.id === replacement.id)) this.replacements.push(replacement);
    }
}
