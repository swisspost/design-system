import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

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

  selector = '[class*="ml-"], [class*="mr-"], [class*="pl-"], [class*="pr-"]';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      // @ts-ignore
      .each((i, element) => {
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
}

class AlignmentClassesUpdate implements IDomUpdate {
  cssClassRegex = new RegExp(`^(float|text)(?:-(${breakpoints.join('|')}))?-(left|right)$`);
  sideUpdate = new Map([['left', 'start'], ['right', 'end']]);

  selector = '[class*="float-"], [class*="text-"]';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      // @ts-ignore
      .each((i, element) => {
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
}
