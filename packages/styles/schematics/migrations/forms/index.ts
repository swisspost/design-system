import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from "../../utils/css/css-classes-update";
import { CssMigration } from "../../utils/css/css-migration";
import { oneOf, optional } from "../../utils/regex";

export default function (): Rule {
    return new CssMigration(
        new FormSelectClassesUpdate,
        new FormSelectMenuClassesUpdate,
        new FormCheckClassesUpdate,
        new FormCheckChildrenClassesUpdate
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
