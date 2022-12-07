import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

import { themeColors } from '../../../utils/constants';

export default function (): Rule {
  return new DomMigration(
    new ButtonOutlineClassUpdate,
    new ButtonInvertedClassUpdate,
    new ButtonIconClassesUpdate
  ).rule;
}

class ButtonOutlineClassUpdate implements IDomUpdate {
  cssClassRegex: RegExp = new RegExp(`^btn-outline-(${themeColors.join('|')})$`);

  selector = themeColors.map(colorname => `.btn-outline-${colorname}`).join(', ');

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
              $element
                .removeClass(cssClass)
                .addClass('btn-secondary');
            }
          });
      });
  }
}

class ButtonInvertedClassUpdate implements IDomUpdate {
  selector = '.btn.btn-inverted';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('btn-inverted');
  }
}

class ButtonIconClassesUpdate implements IDomUpdate {
  selector = '.btn-icon';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $icon = $element.find('.pi');
        const $text = $element.find(':not(.pi, .sr-only, .sr-only-focusable, .visually-hidden, .visually-hidden-focusable)');

        const isButtonWithIconAndText = $icon.length > 0 && $text.length > 0 && $text.text().length > 0;

        if (isButtonWithIconAndText) {
          $element.removeClass('btn-icon');
        }
      });
  }
}
