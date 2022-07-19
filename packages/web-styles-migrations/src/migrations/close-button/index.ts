import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";

/** Entry point for the close button migration. */
export default function (): Rule {
    return new CssMigration(new CloseButtonClassesUpdate).rule;
}

// The .close class is now .btn-close
class CloseButtonClassesUpdate extends CssClassesUpdate {
    searchValue = 'close';
    replaceValue = 'btn-close';
}
