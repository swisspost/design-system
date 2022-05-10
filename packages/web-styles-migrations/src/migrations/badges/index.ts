import {Rule} from '@angular-devkit/schematics';
import {themeColors} from "../../utils/css/constants";
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the badges migration. */
export default function (): Rule {
    return new CssMigration(getBadgeColorClassUpdate(), getBadgePillClassUpdate(), getGreyCarraraBadgeClassUpdate()).rule;
}

function getBadgeColorClassUpdate(): CssClassesUpdate {
    const badgeStyleUpdates = new Map([['badge', 'bg'], ['badge-outline', 'border']]);

    const search = oneOf(badgeStyleUpdates.keys()) + '-' + oneOf(themeColors);
    const replacer = (badgeStyle: string, color: string) => badgeStyleUpdates.get(badgeStyle) + '-' + color;

    return new CssClassesUpdate(search, replacer);
}

function getBadgePillClassUpdate(): CssClassesUpdate {
    return new CssClassesUpdate('badge-pill', 'rounded-pill');
}

function getGreyCarraraBadgeClassUpdate(): CssClassesUpdate {
    const search = 'badge' + optional('(-outline)') + '-gray-carrara' + optional('(-thick)');
    const replacer = (outline: string, thick: string) => (outline ? 'border-light text-secondary' : 'bg-light') + (thick ? ' border-2' : '');

    return new CssClassesUpdate(search, replacer);
}
