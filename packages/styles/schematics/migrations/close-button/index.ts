import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import { oneOf } from '../../utils/regex';

/** Entry point for the close button migration. */
export default function (): Rule {
    return new CssMigration(new CloseButtonClassesUpdate, new CloseButtonClassesRemove).rule;
}

class CloseButtonClassesUpdate extends CssClassesUpdate {
    override classSelector = 'close';
    searchValue = 'close';
    replaceValue = 'btn-close';
}

class CloseButtonClassesRemove extends CssClassesUpdate {
    override classSelector = oneOf(['close', 'btn-close']);
    searchValue = oneOf(['btn', 'btn-icon']);
    replaceValue = '';
}
