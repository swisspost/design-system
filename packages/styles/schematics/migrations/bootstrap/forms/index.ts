import { Rule } from '@angular-devkit/schematics';
import getDomMigrationRule from '../../../utils/dom/migration-rule';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return getDomMigrationRule(
    new FormGroupClassUpdate,
    new FormLabelClassUpdate,
    new FormTextClassUpdate
  );
}

class FormGroupClassUpdate implements DomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $control = $element.find('> input.form-control-lg, select.form-control-lg, > textarea');

        const isFloatingLabel = $control.length > 0;

        if (!isFloatingLabel) {
          $element
            .removeClass('form-group')
            .addClass('mb-regular');
        }
      });
  }
}

class FormLabelClassUpdate implements DomUpdate {
  selector = 'label, [for]';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $control = $element.siblings('input:visible, select:visible, textarea:visible');

        if ($control.length > 0) {
          $element.addClass('form-label');
        }
      });
  }
}

class FormTextClassUpdate implements DomUpdate {
  selector = '.form-text';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('small text-muted');
  }
}
