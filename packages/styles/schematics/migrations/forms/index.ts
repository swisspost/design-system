import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from "../../utils/css/css-classes-update";
import { CssMigration } from "../../utils/css/css-migration";
import { oneOf, optional } from "../../utils/regex";

export default function (): Rule {
    return new CssMigration(
        new FormSelectClassesUpdate,
        new FormSelectMenuClassesUpdate,
        new FormSwitchClassesUpdate,
        new FormSwitchInputClassesUpdate,
        new FormSwitchTogglerClassesUpdate,
    ).rule;
}

// Applied on select, multiselect and custom-select elements
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
