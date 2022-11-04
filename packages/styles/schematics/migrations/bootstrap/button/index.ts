import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

import { themeColors } from '../../../utils/constants';

export default function (): Rule {
  return new DomMigration(
    new ButtonOutlineClassUpdate,
    new ButtonInvertedClassUpdate
  ).rule;
}

class ButtonOutlineClassUpdate implements IDomUpdate {
  cssClassRegex: RegExp = new RegExp(`^btn-outline-(${themeColors.join('|')})$`);

  selector = themeColors.map(colorname => `.btn-outline-${colorname}`).join(', ');

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      // @ts-ignore (unused properties)
      .each((i, element) => {
        const $element = $(element);

        $element
          .attr('class')
          ?.split(' ')
          .forEach(cssClass => {
            const match = cssClass.match(this.cssClassRegex);
            
            if (match) {
              const colorname = match[1];
              
              $element
                .removeClass(cssClass)
                .addClass(`btn-${colorname}`);
            }
          });
      });
  }
}

class ButtonInvertedClassUpdate implements IDomUpdate {
  selector = '.btn.btn-inverted';

  update ($elements: Cheerio<any>) {
    $elements.removeClass('btn-inverted');
  }
}

// TODO: Dropped the usage of .btn-icon class for buttons with icon and text. Icon-only buttons still need this class!
