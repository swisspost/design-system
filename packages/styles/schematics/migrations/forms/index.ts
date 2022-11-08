import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from "../../utils/css/css-classes-update";
import { CssMigration } from "../../utils/css/css-migration";

export default function (): Rule {
    return new CssMigration(
        new FormSelectMenuClassesUpdate
    ).rule;
}

class FormSelectMenuClassesUpdate extends CssClassesUpdate {
    override classSelector = 'custom-select-menu';
    searchValue = 'custom-select-menu';
    replaceValue = 'w-100 mw-100';
}
