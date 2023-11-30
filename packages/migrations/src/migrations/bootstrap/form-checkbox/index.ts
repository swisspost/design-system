import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new FormCheckboxInputClassesUpdate,
    new FormCheckboxLabelClassesUpdate,
    new FormCheckboxClassesUpdate,
  );
}

class FormCheckboxInputClassesUpdate implements DomUpdate {
  selector = '.custom-checkbox.custom-control input.custom-control-input';

  update($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('custom-control-input')
      .addClass('form-check-input');
  }
}

class FormCheckboxLabelClassesUpdate implements DomUpdate {
  selector = '.custom-checkbox.custom-control label.custom-control-label';

  update($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('custom-control-label')
      .addClass('form-check-label');
  }
}

class FormCheckboxClassesUpdate implements DomUpdate {
  selector = '.custom-checkbox.custom-control';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const hasInlineClass = $element.hasClass('custom-control-inline');

        $element
          .removeClass('custom-checkbox custom-control')
          .addClass('form-check');

        if (hasInlineClass) {
          $element
            .removeClass('custom-control-inline')
            .addClass('form-check-inline');
        }
      });
  }
}
