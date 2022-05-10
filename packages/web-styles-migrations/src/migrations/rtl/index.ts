import {Rule} from '@angular-devkit/schematics';
import {breakpoints, sizes} from "../../utils/css/constants";
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the RTL migration. */
export default function (): Rule {
    return new CssMigration(getMarginAndPaddingClassesUpdate(), getTextAlignmentAndFloatClassesUpdate()).rule;
}

function getMarginAndPaddingClassesUpdate(): CssClassesUpdate {
    const properties = ['m', 'p'];
    const sides = ['l', 'r'];

    const search = oneOf(properties) + oneOf(sides) + optional('-' + oneOf(breakpoints)) + '-' + oneOf(sizes);
    const replacer = (property: string, side: string, breakpoint: string | undefined, size: string) => {
        return property + update(side) + (breakpoint ? '-' + breakpoint : '') + '-' + size;
    };

    return new CssClassesUpdate(search, replacer);
}

function getTextAlignmentAndFloatClassesUpdate(): CssClassesUpdate {
    const properties = ['text', 'float'];
    const sides = ['left', 'right'];

    const search = oneOf(properties) + optional('-' + oneOf(breakpoints)) + '-' + oneOf(sides);
    const replacer = (property: string, breakpoint: string, side: string) => {
        return property + (breakpoint ? '-' + breakpoint : '') + '-' + update(side);
    };

    return new CssClassesUpdate(search, replacer);
}

function update(side: string): string | undefined {
    return new Map([['l', 's'], ['r', 'e'], ['left', 'start'], ['right', 'end']]).get(side);
}
