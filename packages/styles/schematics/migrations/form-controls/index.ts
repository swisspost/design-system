import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from "../../utils/css/css-classes-update";
import { CssMigration } from "../../utils/css/css-migration";
import { oneOf, optional } from "../../utils/regex";

/** Entry point for the forms migration. */
export default function (): Rule {
    return new CssMigration(
        new FormGroupClassesUpdate,
        new FormTextClassesUpdate,
        new FormSelectClassesUpdate,
        new FormSelectMenuClassesUpdate,
        new FormCheckClassesUpdate,
        new FormCheckChildrenClassesUpdate,
        new FormSwitchClassesUpdate,
        new FormSwitchInputClassesUpdate,
        new FormSwitchTogglerClassesUpdate,
    ).rule;
}

class FormGroupClassesUpdate extends CssClassesUpdate {
    searchValue = 'form-group';
    replaceValue = 'mb-regular';
}

class FormTextClassesUpdate extends CssClassesUpdate {
    override classSelector = 'form-text';
    searchValue = oneOf(['small', 'text-muted']);
    replaceValue = '';
}

class FormSelectClassesUpdate extends CssClassesUpdate {
    override classSelector = 'custom-select';
    searchValue = `form-control${optional(`-${oneOf(['sm', 'rg', 'md', 'lg'])}`)}`;
    replaceValue = (size: string) => `form-select${size ? `-${size}` : ''}`;
}

class FormSelectMenuClassesUpdate extends CssClassesUpdate {
    override classSelector = 'custom-select-menu';
    searchValue = 'custom-select-menu';
    replaceValue = 'w-100 mw-100';
}

class FormCheckClassesUpdate extends CssClassesUpdate {
    override classSelector = oneOf(['custom-checkbox', 'custom-radio']);
    searchValue = oneOf(['custom-control', 'custom-checkbox', 'custom-radio']);
    replaceValue = 'form-check';
}

class FormCheckChildrenClassesUpdate extends CssClassesUpdate {
    override classSelector = oneOf(['custom-control-input', 'custom-control-label', 'custom-control-inline']);
    searchValue = `custom-control-${oneOf(['input', 'label', 'inline'])}`;
    replaceValue = (child: string) => `form-check-${child}`;
}

class FormSwitchClassesUpdate extends CssClassesUpdate {
    override tagSelector = 'div';
    override classSelector = 'switch';
    searchValue = 'switch';
    replaceValue = 'form-check form-switch';
}

class FormSwitchInputClassesUpdate extends CssClassesUpdate {
    override tagSelector = 'input';
    override classSelector = 'switch';
    searchValue = 'switch';
    replaceValue = 'form-check-input';
}

class FormSwitchTogglerClassesUpdate extends CssClassesUpdate {
    override classSelector = 'switch-toggler';
    searchValue = 'switch-toggler';
    replaceValue = '';
}
