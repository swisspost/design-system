import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

import { themeColors } from '../../../utils/constants';

export default function (): Rule {
  return new DomMigration(
    new BackgroundOpacityClassesUpdate
  ).rule;
}

class BackgroundOpacityClassesUpdate implements IDomUpdate {
  cssClassRegex: RegExp = new RegExp(`^bg-(${themeColors.join('|')})-opacity-(\\d+)$`);

  selector = themeColors.map(colorname => `[class*="bg-${colorname}-opacity-"]`).join(', ');

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
              const colorname = match[1];
              const opacityvalue = Number(match[2]);
              
              $element
                .removeClass(cssClass)
                .addClass(`bg-${colorname}`)
                .css('--post-bg-opacity', `${opacityvalue / 100}`);
            }
          });
      });
  }
}