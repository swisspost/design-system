import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {themeColors} from "../../utils/constants";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the badges migration. */
export default function (): Rule {
    return new CssMigration(new BadgeColorClassUpdate, new BadgePillClassUpdate, new GreyCarraraBadgeClassUpdate).rule;
}

// The .badge-* classes no longer exists
class BadgeColorClassUpdate extends CssClassesUpdate {
    badgeStyleUpdates = new Map([['badge', 'bg'], ['badge-outline', 'border']]);

    searchValue = oneOf(this.badgeStyleUpdates.keys()) + '-' + oneOf(themeColors);
    replaceValue = (badgeStyle: string, color: string) => this.badgeStyleUpdates.get(badgeStyle) + '-' + color;
}

class BadgePillClassUpdate extends CssClassesUpdate {
    searchValue = 'badge-pill';
    replaceValue = 'rounded-pill';
}

class GreyCarraraBadgeClassUpdate extends CssClassesUpdate {
    searchValue = 'badge' + optional('(-outline)') + '-gray-carrara' + optional('(-thick)');
    replaceValue = (outline: string, thick: string) => (outline ? 'border-light' : 'bg-light') + (thick ? ' border-2' : '');
}
