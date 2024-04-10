import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';
import { themeColors } from '../../../utils/constants';

export default function (): Rule {
  return getDomMigrationRule(
    new BadgeCheckToChipFilterUpdate(),
    new BadgeToChipDismissibleUpdate(),
    new BadgeToTagUpdate(),
  );
}

class BadgeCheckToChipFilterUpdate implements DomUpdate {
  selector = '.badge-check';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);

      $element.removeClass('badge-check').addClass('chip-filter');

      const $input = $element.children('.badge-check-input');
      if ($input) $input.removeClass('badge-check-input').addClass('chip-filter-input');

      const $label = $element.children('.badge-check-label');
      if ($label) $label.removeClass('badge-check-label').addClass('chip-filter-label');

      addChipTextClass($label);
    });
  }
}

class BadgeToChipDismissibleUpdate implements DomUpdate {
  selector = '.badge';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);

      // only update badge with close button
      const $closeBtn = $element.children('.btn-close');
      if (!$closeBtn.length) {
        return;
      }

      addChipTextClass($element);

      $closeBtn.removeAttr('class').addClass('chip chip-dismissible');

      const ariaLabel = $closeBtn.attr('aria-label');
      if (ariaLabel) {
        $closeBtn.removeAttr('aria-label');
        $closeBtn.append(`<span class="visually-hidden">${ariaLabel}</span>`);
      }

      $closeBtn.append($element.children()).data($element.data());

      $element.replaceWith($closeBtn);
    });
  }
}

class BadgeToTagUpdate implements DomUpdate {
  selector = '.badge';

  bgClassRegex: RegExp = new RegExp(`^bg-(${themeColors.join('|')})$`);

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);

      // do not update nested badges
      const $parent = $element.parent();
      if ($parent.hasClass('tag')) {
        return;
      }

      $element.removeClass('badge').addClass('tag');

      if ($element.hasClass('badge-sm')) $element.removeClass('badge-sm').addClass('tag-sm');

      $element
        .attr('class')
        ?.split(' ')
        .forEach(cssClass => {
          const [_, bgColor] = cssClass.match(this.bgClassRegex) ?? [];

          if (!bgColor) return;

          if (bgColor === 'active' || bgColor === 'yellow') $element.addClass('tag-yellow');
          if (bgColor === 'white') $element.addClass('tag-white');
          if (bgColor === 'info') $element.addClass('tag-info');
          if (bgColor === 'success') $element.addClass('tag-success');
          if (bgColor === 'danger') $element.addClass('tag-danger');
          if (bgColor === 'warning') $element.addClass('tag-warning');

          $element.removeClass(cssClass);
        });
    });
  }
}

function addChipTextClass($element: Cheerio<AnyNode>) {
  $element.children('span:not(.badge)').addClass('chip-text');
}
