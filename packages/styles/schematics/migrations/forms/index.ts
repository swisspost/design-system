import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the forms' migration. */
export default function (): Rule {
    // CustomSelectClassesUpdate must be applied AFTER FormSelectClassesUpdate
    return new CssMigration(new FormGroupClassesUpdate, new CustomControlClassesUpdate, new FormCheckClassesUpdate, new FormCheckChildrenClassesUpdate, new FormSelectClassesUpdate, new CustomSelectClassesUpdate, new FormSelectMenuClassesUpdate, new FormSwitchWrapperClassesUpdate, new FormSwitchInputClassesUpdate, new FormSwitchTogglerClassesUpdate, new FormTextClassesUpdate).rule;
}

// The .form-group class no longer exists
class FormGroupClassesUpdate extends CssClassesUpdate {
    searchValue = 'form-group';
    replaceValue = 'mb-regular';
}

// The custom controls no longer exist, in favor of native controls
class CustomControlClassesUpdate extends CssClassesUpdate {
    searchValue = 'custom-control';
    replaceValue = '';
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

    override classSelector = 'custom-select';
    searchValue = 'form-control' + optional('-' + oneOf(this.sizes));
    replaceValue = (size: string) => 'form-select' + (size ? '-' + size : '');
}

class CustomSelectClassesUpdate extends CssClassesUpdate {
    searchValue = 'custom-select';
    replaceValue = '';
}

class FormSelectMenuClassesUpdate extends CssClassesUpdate {
    searchValue = 'custom-select-menu';
    replaceValue = 'w-100 mw-100';
}

class FormSwitchWrapperClassesUpdate extends CssClassesUpdate {
    override tagSelector = 'div';
    searchValue = 'switch';
    replaceValue = 'form-check form-switch';
}

class FormSwitchInputClassesUpdate extends CssClassesUpdate {
    override tagSelector = 'input';
    searchValue = 'switch';
    replaceValue = 'form-check-input';
}

class FormSwitchTogglerClassesUpdate extends CssClassesUpdate {
    searchValue = 'switch-toggler';
    replaceValue = '';
}

// Form texts no longer needs the .small and .text-muted classes
class FormTextClassesUpdate extends CssClassesUpdate {
    override classSelector = 'form-text';
    searchValue = oneOf(['small', 'text-muted']);
    replaceValue = '';
}
