import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormGroupClassUpdate,
    new FormLabelClassUpdate,
    new FormTextClassUpdate
  ).rule;
}

class FormGroupClassUpdate implements IDomUpdate {
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

class FormLabelClassUpdate implements IDomUpdate {
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

class FormTextClassUpdate implements IDomUpdate {
  selector = '.form-text';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('small text-muted');
  }
}
