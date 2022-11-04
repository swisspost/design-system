import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

import { themeColors } from '../../../utils/constants';

export default function (): Rule {
  return new DomMigration(
    new BadgePillClassUpdate,
    new BadgeBGClassUpdate,
    new BadgeOutlineClassUpdate,
    new BadgeCararraClassUpdate,
    new BadgeCararraThickClassUpdate
  ).rule;
}

class BadgePillClassUpdate implements IDomUpdate {
  selector = '.badge-pill';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('badge-pill')
      .addClass('rounded-pill');
  }
}

class BadgeBGClassUpdate implements IDomUpdate {
  cssClassRegex: RegExp = new RegExp(`^badge-(${themeColors.join('|')})$`);

  selector = themeColors.map(colorname => `.badge-${colorname}`).join(', ');

  update ($elements: Cheerio<any>, $: CheerioAPI) {
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
              
              $element
                .removeClass(cssClass)
                .addClass(`bg-${colorname}`);
            }
          });
      });
  }
}

class BadgeOutlineClassUpdate implements IDomUpdate {
  cssClassRegex: RegExp = new RegExp(`^badge-outline-(${themeColors.join('|')})$`);

  selector = themeColors.map(colorname => `.badge-outline-${colorname}`).join(', ');

  update ($elements: Cheerio<any>, $: CheerioAPI) {
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
              
              $element
                .removeClass(cssClass)
                .addClass(`border-${colorname}`);
            }
          });
      });
  }
}

class BadgeCararraClassUpdate implements IDomUpdate {
  selector = '.badge-gray-cararra';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('badge-gray-cararra')
      .addClass('bg-light');
  }
}

class BadgeCararraThickClassUpdate implements IDomUpdate {
  selector = '.badge-outline-gray-cararra-thick';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('badge-outline-gray-cararra-thick')
      .addClass('border-light border-2');
  }
}