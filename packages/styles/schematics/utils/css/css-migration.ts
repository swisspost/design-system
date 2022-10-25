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
            .filter(u => u.tag === null || u.tag.test(element?.name ?? ''))
            .filter(u => u.class === null || element?.attributes.filter(a => a.name === 'class' && a.value.split(' ').some(v => u.class && u.class.test(v))))
            .filter(u => u.attribute === null || element?.attributes.some(a => u.attribute && u.attribute.test(a.name)));
    }

    currentTemplate (element: TmplAstTemplate | null) {
        this.filteredUpdates = this.updates
            .filter(u => u.tag === null || u.tag.test(element?.tagName ?? ''))
            .filter(u => u.class === null || element?.attributes.filter(a => a.name === 'class' && a.value.split(' ').some(v => u.class && u.class.test(v))))
            .filter(u => u.attribute === null || element?.attributes.some(a => u.attribute && u.attribute.test(a.name)));
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
