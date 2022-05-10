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

    evaluate(classes: string = '') {
        return classes.split(' ').some(cssClass => {
            return this.updates.some(update => update.searcher.test(cssClass));
        });
    }

    apply(classes: string = '') {
        return classes.split(' ').map(cssClass => this.updates.reduce((updatedClass, update) => {
            return updatedClass.replace(update.searcher, update.replacer);
        }, cssClass)).join(' ');
    }
}
