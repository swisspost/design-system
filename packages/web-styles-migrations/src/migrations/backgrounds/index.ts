import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";

/** Entry point for the backgrounds' migration. */
export default function (): Rule {
    return new CssMigration(new TextAutoClassesUpdate).rule;
}

class TextAutoClassesUpdate extends CssClassesUpdate {
    searchValue = 'text-auto';
    replaceValue = '';
}

// TODO: Replace .bg-[themeColor]-opacity-80 by style="--bg-opacity: 0.8"
