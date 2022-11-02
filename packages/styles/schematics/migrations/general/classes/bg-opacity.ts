import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio } from 'cheerio';

import { themeColors } from '../../../utils/constants';

export default function (): Rule {
  return new DomMigration(
    new BackgroundOpacityClassesUpdate
  ).rule;
}

const cssClassMatcher = new RegExp(`^bg-(${themeColors.join('|')})-opacity-(\\d+)$`);

class BackgroundOpacityClassesUpdate extends DomUpdate {
  selector = themeColors.map(colorname => `[class*="bg-${colorname}-opacity-"]`).join(', ');

  update = function ($element: Cheerio<any>) {
    $element
      .attr('class')
      ?.split(' ')
      .forEach(cssClass => {
        const match = cssClass.match(cssClassMatcher);
        
        if (match) {
          const colorname = match[1];
          const opacityvalue = Number(match[2]);
          
          $element
            .removeClass(cssClass)
            .addClass(`bg-${colorname}`)
            .attr('style', `--post-bg-opacity: ${opacityvalue / 100};`);
        }
      });
  }
}