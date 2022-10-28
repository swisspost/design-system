import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from '../../utils/css/css-classes-update';
import { CssMigration } from '../../utils/css/css-migration';
import { oneOf } from '../../utils/regex';

/** Entry point for the backgrounds' migration. */
export default function (): Rule {
    return new CssMigration(new SecondaryClassesUpdate).rule;
}

// The .text-auto class no longer exists
class SecondaryClassesUpdate extends CssClassesUpdate {
    searchValue = oneOf(['bg-secondary', 'border-secondary', 'text-secondary']);
    replaceValue = '';
}
