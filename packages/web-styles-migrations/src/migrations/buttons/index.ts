import {Rule} from '@angular-devkit/schematics';
import {themeColors} from "../../utils/css/constants";
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf} from "../../utils/regex";

/** Entry point for the buttons' migration. */
export default function (): Rule {
    return new CssMigration(new OutlinedButtonClassesUpdate, new InvertedButtonClassesUpdate).rule;
}

// The outlined colored buttons no longer exist
class OutlinedButtonClassesUpdate extends CssClassesUpdate {
    searchValue = 'btn-outline-' + oneOf(themeColors);
    replaceValue = (color: string) => 'btn-' + color;
}

// The .btn-inverted class no longer exists
class InvertedButtonClassesUpdate extends CssClassesUpdate {
    searchValue = 'btn-inverted';
    replaceValue = '';
}
