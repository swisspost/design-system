import {Rule} from '@angular-devkit/schematics';
import {CssClassesUpdate} from "../../utils/css/css-classes-update";
import {breakpoints, sizes} from "../../utils/css/constants";
import {CssMigration} from "../../utils/css/css-migration";
import {oneOf, optional} from "../../utils/regex";

/** Entry point for the RTL migration. */
export default function (): Rule {
    return new CssMigration(new MarginAndPaddingClassesUpdate, new TextAlignmentAndFloatClassesUpdate).rule;
}

// Horizontal direction have been renamed to use start and end in lieu of left and right
class MarginAndPaddingClassesUpdate extends CssClassesUpdate {
    properties = ['m', 'p'];
    sides = ['l', 'r'];

    searchValue = oneOf(this.properties) + oneOf(this.sides) + optional('-' + oneOf(breakpoints)) + '-' + oneOf(sizes);

    replaceValue = (property: string, side: string, breakpoint: string | undefined, size: string) => {
        return property + update(side) + (breakpoint ? '-' + breakpoint : '') + '-' + size;
    };

}

class TextAlignmentAndFloatClassesUpdate extends CssClassesUpdate {
    properties = ['text', 'float'];
    sides = ['left', 'right'];

    searchValue = oneOf(this.properties) + optional('-' + oneOf(breakpoints)) + '-' + oneOf(this.sides);

    replaceValue = (property: string, breakpoint: string, side: string) => {
        return property + (breakpoint ? '-' + breakpoint : '') + '-' + update(side);
    };
}

function update(side: string): string | undefined {
    return new Map([['l', 's'], ['r', 'e'], ['left', 'start'], ['right', 'end']]).get(side);
}
