import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from "../../utils/css/css-classes-update";
import { CssMigration } from "../../utils/css/css-migration";

/** Entry point for the ng-buttons migration. */
export default function (): Rule {
    return new CssMigration(new NgButtonClassUpdate).rule;
}

// The label classes have changed
class NgButtonClassUpdate extends CssClassesUpdate {
    override tagSelector = 'label';
    override classSelector = 'btn-primary';
    override attributeSelector = 'ngbButtonLabel';
    searchValue = 'btn-primary';
    replaceValue = 'btn btn-secondary';
}
