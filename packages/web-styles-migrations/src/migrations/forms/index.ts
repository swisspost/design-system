import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the forms migration. */
export default function (): Rule {
    return new CssMigration(getFormGroupClassesUpdate(), getFormCheckClassesUpdate(), getFormCheckChildrenClassesUpdate(), getFormSelectClassesUpdate(), getFormSelectMenuClassesUpdate()).rule;
}

function getFormGroupClassesUpdate(): CssClassesUpdate {
    return new CssClassesUpdate('form-group', 'mb-regular');
}

function getFormCheckClassesUpdate(): CssClassesUpdate {
    const formCheckTypes = ['checkbox', 'radio'];
    return new CssClassesUpdate('custom-' + oneOf(formCheckTypes), 'form-check');
    // TODO: remove the .custom-control class that used to come with .custom-checkbox and .custom-radio
}

function getFormCheckChildrenClassesUpdate(): CssClassesUpdate {
    const children = ['input', 'label', 'inline'];

    const search = 'custom-control-' + oneOf(children);
    const replacer = (child: string) => 'form-check-' + child;

    return new CssClassesUpdate(search, replacer);
}

function getFormSelectClassesUpdate(): CssClassesUpdate {
    const sizes = ['sm', 'rg', 'lg'];

    const search = 'custom-select' + optional('-' + oneOf(sizes));
    const replacer = (size: string) => 'form-select' + (size ? '-' + size : '');
    // TODO: remove the .form-control class that sometimes used to come with .custom-select

    return new CssClassesUpdate(search, replacer);
}

function getFormSelectMenuClassesUpdate(): CssClassesUpdate {
    return new CssClassesUpdate('custom-select-menu', 'w-100 mw-100');
}


