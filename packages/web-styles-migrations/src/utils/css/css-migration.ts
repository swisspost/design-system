import {Rule} from "@angular-devkit/schematics";
import {CssClassesUpdate} from "./css-classes-update";
import {getCssMigrationRule} from "./css-migration-rule";

export class CssMigration {
    updates: CssClassesUpdate[]
    rule: Rule;

    constructor(...updates: CssClassesUpdate[]) {
        this.updates = updates;
        this.rule = getCssMigrationRule(this);
    }

    evaluate(classes: string = ''): boolean {
        const classList = classes.split(' ');
        return this.updates.some(update => {
            if (update.selector && !classList.includes(update.selector)) {
                return false;
            }

            return classList.some(cssClass => update.searcher.test(cssClass));
        });
    }

    apply(classes: string = ''): string {
        return classes.split(' ')
            .reduce((updatedClasses, cssClass) => {
                const updatedClass = this.getUpdatedClass(cssClass);

                if (!updatedClass) {
                    return updatedClasses;
                }

                return updatedClasses ? `${updatedClasses} ${updatedClass}` : updatedClass;
            }, '');
    }

    private getUpdatedClass(cssClass: string): string {
        return this.updates.reduce((updatedClass, update) => {
            return updatedClass.replace(update.searcher, update.replacer);
        }, cssClass);
    }
}
