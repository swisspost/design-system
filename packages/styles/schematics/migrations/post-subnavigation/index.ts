import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from '../../utils/css/css-classes-update';
import { CssMigration } from '../../utils/css/css-migration';

/** Entry point for the post-subnavigation migration. */
export default function (): Rule {
    return new CssMigration(new SecondaryClassesUpdate).rule;
}

// The .subnavigation-inverted class no longer exists
class SecondaryClassesUpdate extends CssClassesUpdate {
    override classSelector: 'subnavigation-inverted';
    searchValue = 'subnavigation-inverted';
    replaceValue = '';
}
