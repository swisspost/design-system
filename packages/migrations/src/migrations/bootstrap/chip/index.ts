import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(new BadgeCheckToChipCheckUpdate(), new BadgeToChipUpdate());
}

class BadgeCheckToChipCheckUpdate implements DomUpdate {
  selector = '.badge-check';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);

      $element.removeClass('badge-check').addClass('chip-check');

      const $label = $element.children('.badge-check-label');
      if ($label) $label.removeClass('badge-check-label').addClass('chip-check-label');

      const $input = $element.children('.badge-check-input');
      if ($input) $input.removeClass('badge-check-input').addClass('chip-check-input');
    });
  }
}

class BadgeToChipUpdate implements DomUpdate {
  selector = '.badge';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);

      // do not update nested badges
      const $parent = $element.parent();
      if ($parent.hasClass('chip') || $parent.hasClass('chip-check-label')) {
        return;
      }

      $element.removeClass('badge').addClass('chip');

      // remove obsolete badge classes
      $element
        .attr('class')
        ?.split(' ')
        .forEach(cssClass => {
          const isBgClass = cssClass.match(/^bg-\w+$/);
          const isBorderClass = cssClass.match(/^border(-\w+)?$/);
          const isRoundedClass = cssClass.match(/^rounded(-\w+)?$/);

          if (isBgClass || isBorderClass || isRoundedClass) {
            $element.removeClass(cssClass);

            if (isBgClass && isBgClass[1] === 'active') {
              $element.addClass('active');
            }
          }
        });

      if ($element.hasClass('badge-sm')) {
        $element.removeClass('badge-sm').addClass('chip-sm');
      }

      if ($element.hasClass('bg-active')) {
        $element.removeClass('bg-active').addClass('active');
      }

      // move the close button to be the first child
      const $closeBtn = $element.children('.btn-close');
      if ($closeBtn && $closeBtn.is(':last-child')) {
        $element.prepend($closeBtn);
      }
    });
  }
}
