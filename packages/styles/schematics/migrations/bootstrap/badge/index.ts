import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { themeColors } from '../../../utils/constants';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new BadgePillClassUpdate,
    new BadgeBGClassUpdate,
    new BadgeOutlineClassUpdate,
    new BadgeCararraClassUpdate,
    new BadgeCararraThickClassUpdate,
  );
}

class BadgePillClassUpdate implements DomUpdate {
  selector = '.badge-pill';

  update($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('badge-pill')
      .addClass('rounded-pill');
  }
}

class BadgeBGClassUpdate implements DomUpdate {
  cssClassRegex: RegExp = new RegExp(`^badge-(${themeColors.join('|')})$`);

  selector = themeColors.map(colorname => `.badge-${colorname}`).join(', ');

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
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

class BadgeOutlineClassUpdate implements DomUpdate {
  cssClassRegex: RegExp = new RegExp(`^badge-outline-(${themeColors.join('|')})$`);

  selector = themeColors.map(colorname => `.badge-outline-${colorname}`).join(', ');

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
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

class BadgeCararraClassUpdate implements DomUpdate {
  selector = '.badge-gray-cararra';

  update($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('badge-gray-cararra')
      .addClass('bg-light');
  }
}

class BadgeCararraThickClassUpdate implements DomUpdate {
  selector = '.badge-outline-gray-cararra-thick';

  update($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('badge-outline-gray-cararra-thick')
      .addClass('border-light border-2');
  }
}
