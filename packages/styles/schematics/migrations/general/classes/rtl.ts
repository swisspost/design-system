import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

import { breakpoints, sizes } from "../../../utils/constants";

export default function (): Rule {
  return new DomMigration(
    new SpacingClassesUpdate,
    new AlignmentClassesUpdate
  ).rule;
}

class SpacingClassesUpdate implements IDomUpdate {
  cssClassRegex = new RegExp(`^(m|p)(l|r)(?:-(${breakpoints.join('|')}))?-(${sizes.join('|')})$`);
  sideUpdate = new Map([['l', 's'], ['r', 'e']]);

  selector = this.createSelectors();

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);

        $element
          .attr('class')
          ?.split(' ')
          .forEach(cssClass => {
            const match = cssClass.match(this.cssClassRegex);
    
            if (match) {
              const property = match[1];
              const side = match[2];
              const breakpoint = match[3];
              const size = match[4];
              
              $element
                .removeClass(cssClass)
                .addClass(`${property}${this.sideUpdate.get(side)}${breakpoint ? `-${breakpoint}` : ''}-${size}`);
            }
          });
      })
  }

  createSelectors () {
    const selectorProperties = ['m', 'p'];
    const selectorSides = ['l', 'r'];
    const selectorBreakpoints = [''].concat(breakpoints);
    
    return selectorProperties.map(property => selectorSides.map(side => selectorBreakpoints.map(breakpoint => sizes.map(size => `.${property}${side}${breakpoint ? `-${breakpoint}` : ''}-${size}`)))).join(', ');
  }
}

class AlignmentClassesUpdate implements IDomUpdate {
  cssClassRegex = new RegExp(`^(float|text)(?:-(${breakpoints.join('|')}))?-(left|right)$`);
  sideUpdate = new Map([['left', 'start'], ['right', 'end']]);

  selector = this.createSelectors();

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);

        $element
          .attr('class')
          ?.split(' ')
          .forEach(cssClass => {
            const match = cssClass.match(this.cssClassRegex);
    
            if (match) {
              const property = match[1];
              const breakpoint = match[2];
              const side = match[3];
              
              $element
                .removeClass(cssClass)
                .addClass(`${property}${breakpoint ? `-${breakpoint}` : ''}-${this.sideUpdate.get(side)}`);
            }
          });
      })
  }

  createSelectors () {
    const selectorProperties = ['float', 'text'];
    const selectorBreakpoints = [''].concat(breakpoints);
    const selectorSides = ['left', 'right'];
    
    return selectorProperties.map(property => selectorBreakpoints.map(breakpoint => selectorSides.map(side => `.${property}${breakpoint ? `-${breakpoint}` : ''}-${side}`))).join(', ');
  }
}
