import { TmplAstElement, TmplAstTemplate } from "@angular/compiler";
import {Rule} from "@angular-devkit/schematics";
import {CssClassesUpdate} from "./css-classes-update";
import {getCssMigrationRule} from "./css-migration-rule";

export class CssMigration {
    updates: CssClassesUpdate[]
    filteredUpdates: CssClassesUpdate[]
    rule: Rule;

    constructor(...updates: CssClassesUpdate[]) {
        this.updates = updates;
        this.rule = getCssMigrationRule(this);
    }

    currentElement (element: TmplAstElement | null) {
        this.filteredUpdates = this.updates
            .filter(u => !u.tagSelector || u.tagSelector === element?.name)
            .filter(u => !u.classSelector || element?.attributes.filter(a => a.name === 'class' && a.value.split(' ').includes(u.classSelector)))
            .filter(u => !u.attributeSelector || element?.attributes.some(a => a.name === u.attributeSelector));
    }

    currentTemplate (element: TmplAstTemplate | null) {
        this.filteredUpdates = this.updates
            .filter(u => !u.tagSelector || u.tagSelector === element?.tagName)
            .filter(u => !u.classSelector || element?.attributes.filter(a => a.name === 'class' && a.value.split(' ').includes(u.classSelector)))
            .filter(u => !u.attributeSelector || element?.attributes.some(a => a.name === u.attributeSelector));
    }

    evaluate(classes: string = ''): boolean {
        return classes
            .split(' ')
            .some(cssClass => this.filteredUpdates.some(update => update.searcher.test(cssClass)));
    }

    apply(classes: string = ''): string {
        return classes
            .split(' ')
            .map(cssClass => this.filteredUpdates.reduce((updatedClass, update) => updatedClass.replace(update.searcher, update.replacer), cssClass))
            .filter(cssClass => cssClass !== '')
            .join(' ');
    }
}
