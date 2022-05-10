import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";

/** Entry point for the close button migration. */
export default function (): Rule {
    const closeButtonClassesUpdate = new CssClassesUpdate('close', 'btn-close');
    return new CssMigration(closeButtonClassesUpdate).rule;
}
