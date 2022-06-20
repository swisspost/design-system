import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the forms' migration. */
export default function (): Rule {
    return new CssMigration(new FormGroupClassesUpdate, new FormCheckClassesUpdate, new FormCheckChildrenClassesUpdate, new FormSelectClassesUpdate, new FormSelectMenuClassesUpdate).rule;
}

class FormGroupClassesUpdate extends CssClassesUpdate {
    searchValue = 'form-group';
    replaceValue = 'mb-regular';
}

class FormCheckClassesUpdate extends CssClassesUpdate {
    formCheckTypes = ['checkbox', 'radio'];

    searchValue = 'custom-' + oneOf(this.formCheckTypes);
    replaceValue = 'form-check';
    // TODO: remove the .custom-control class that used to come with .custom-checkbox and .custom-radio
}

class FormCheckChildrenClassesUpdate extends CssClassesUpdate {
    children = ['input', 'label', 'inline'];

    searchValue = 'custom-control-' + oneOf(this.children);
    replaceValue = (child: string) => 'form-check-' + child;
}

class FormSelectClassesUpdate extends CssClassesUpdate {
    sizes = ['sm', 'rg', 'lg'];

    searchValue = 'custom-select' + optional('-' + oneOf(this.sizes));
    replaceValue = (size: string) => 'form-select' + (size ? '-' + size : '');
    // TODO: remove the .form-control class that sometimes used to come with .custom-select
}

class FormSelectMenuClassesUpdate extends CssClassesUpdate {
    searchValue = 'custom-select-menu';
    replaceValue = 'w-100 mw-100';
}


