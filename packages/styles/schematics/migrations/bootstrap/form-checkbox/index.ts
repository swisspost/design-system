import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormCheckboxInputClassesUpdate,
    new FormCheckboxLabelClassesUpdate,
    new FormCheckboxClassesUpdate
  ).rule;
}

class FormCheckboxInputClassesUpdate implements IDomUpdate {
  selector = '.custom-checkbox.custom-control input.custom-control-input';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('custom-control-input')
      .addClass('form-check-input');
  }
}

class FormCheckboxLabelClassesUpdate implements IDomUpdate {
  selector = '.custom-checkbox.custom-control label.custom-control-label';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('custom-control-label')
      .addClass('form-check-label');
  }
}

class FormCheckboxClassesUpdate implements IDomUpdate {
  selector = '.custom-checkbox.custom-control';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
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
