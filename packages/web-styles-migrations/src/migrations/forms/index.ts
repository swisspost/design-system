import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the forms' migration. */
export default function (): Rule {
    return new CssMigration(new FormGroupClassesUpdate, new FormCheckClassesUpdate, new FormCheckChildrenClassesUpdate, new FormSelectClassesUpdate, new CustomSelectClassesUpdate, new FormSelectMenuClassesUpdate, new FormSwitchTogglerClassesUpdate, new FormTextClassesUpdate, new CustomControlClassesUpdate).rule;
}

class FormGroupClassesUpdate extends CssClassesUpdate {
    searchValue = 'form-group';
    replaceValue = 'mb-regular';
}

class FormCheckClassesUpdate extends CssClassesUpdate {
    formCheckTypes = ['checkbox', 'radio'];

    searchValue = 'custom-' + oneOf(this.formCheckTypes);
    replaceValue = 'form-check';
}

class FormCheckChildrenClassesUpdate extends CssClassesUpdate {
    children = ['input', 'label', 'inline'];

    searchValue = 'custom-control-' + oneOf(this.children);
    replaceValue = (child: string) => 'form-check-' + child;
}

class FormSelectClassesUpdate extends CssClassesUpdate {
    sizes = ['sm', 'rg', 'lg'];

    override selector = 'custom-select';
    searchValue = 'form-control' + optional('-' + oneOf(this.sizes));
    replaceValue = (size: string) => 'form-select' + (size ? '-' + size : '');
}

// CustomSelectClassesUpdate must be applied AFTER FormSelectClassesUpdate
class CustomSelectClassesUpdate extends CssClassesUpdate {
    searchValue = 'custom-select';
    replaceValue = '';
}

class FormSelectMenuClassesUpdate extends CssClassesUpdate {
    searchValue = 'custom-select-menu';
    replaceValue = 'w-100 mw-100';
}

class FormSwitchTogglerClassesUpdate extends CssClassesUpdate {
    searchValue = 'switch-toggler';
    replaceValue = '';
}

class FormTextClassesUpdate extends CssClassesUpdate {
    override selector = 'form-text';
    searchValue = oneOf(['small', 'text-muted']);
    replaceValue = '';
}

class CustomControlClassesUpdate extends CssClassesUpdate {
    searchValue = 'custom-control';
    replaceValue = '';
}
