import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio } from 'cheerio';

import { themeColors } from '../../../utils/constants';

export default function (): Rule {
  return new DomMigration(
    new BackgroundOpacityClassesUpdate
  ).rule;
}

class BackgroundOpacityClassesUpdate implements IDomUpdate {
  cssClassRegex: RegExp = new RegExp(`^bg-(${themeColors.join('|')})-opacity-(\\d+)$`);

  selector = themeColors.map(colorname => `[class*="bg-${colorname}-opacity-"]`).join(', ');

  update ($elements: Cheerio<any>) {
    $elements
      .attr('class')
      ?.split(' ')
      .forEach(cssClass => {
        const match = cssClass.match(this.cssClassRegex);
        
        if (match) {
          const colorname = match[1];
          const opacityvalue = Number(match[2]);
          
          $elements
            .removeClass(cssClass)
            .addClass(`bg-${colorname}`)
            .attr('style', `--post-bg-opacity: ${opacityvalue / 100};`);
        }
      });
  }
}