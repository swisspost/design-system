import {Rule} from "@angular-devkit/schematics";
import {CssClassesUpdate} from "./css-classes-update";
import {getCssMigrationRule} from "./css-migration-rule";

export class CssMigration {
    currentTag: string | null;
    updates: CssClassesUpdate[]
    rule: Rule;

    constructor(...updates: CssClassesUpdate[]) {
        this.updates = updates;
        this.rule = getCssMigrationRule(this);
    }

    evaluate(classes: string = ''): boolean {
        const classList = classes.split(' ');
        return this.updates.some(update => {
            const incorrectTag = update.tag && update.tag !== this.currentTag;
            const incorrectClasses = update.selector && !classList.includes(update.selector);
            if (incorrectTag || incorrectClasses) {
                return false;
            }

            return classList.some(cssClass => update.searcher.test(cssClass));
        });
    }

    apply(classes: string = ''): string {
        const classList = classes.split(' ');
        return this.updates.reduce((updatedClasses, update) => {
            const incorrectTag = update.tag && update.tag !== this.currentTag;
            const incorrectClasses = update.selector && !classList.includes(update.selector);

            if (incorrectTag || incorrectClasses) {
                return updatedClasses;
            }

            return updatedClasses
                .map(currentClass => currentClass.replace(update.searcher, update.replacer))
                .filter(updatedClass => !!updatedClass);
        }, classList).join(' ');
    }
}
