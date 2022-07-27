import {Rule} from "@angular-devkit/schematics";
import {CssClassesUpdate} from "./css-classes-update";
import {getCssMigrationRule} from "./css-migration-rule";

export class CssMigration {
    updates: CssClassesUpdate[]
    rule: Rule;

    set currentTag(value: string | null) {
        this.updates = this.updates.filter(update => !update.tag || update.tag === value);
    }

    constructor(...updates: CssClassesUpdate[]) {
        this.updates = updates;
        this.rule = getCssMigrationRule(this);
    }

    evaluate(classes: string = ''): boolean {
        const classList = classes.split(' ');
        const applicableUpdate = this.getApplicableUpdates(classList);

        return classList.some(cssClass => {
            return applicableUpdate.some(update => update.searcher.test(cssClass));
        });
    }

    apply(classes: string = ''): string {
        const classList = classes.split(' ');
        const applicableUpdate = this.getApplicableUpdates(classList);

        return classList.map(cssClass => applicableUpdate.reduce((updatedClass, update) => {
            return updatedClass.replace(update.searcher, update.replacer);
        }, cssClass)).join(' ');
    }

    private getApplicableUpdates(classList: string[]) {
        return this.updates.filter(update => !!update.selector || classList.includes(update.selector));
    }
}
