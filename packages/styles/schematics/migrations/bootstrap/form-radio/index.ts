import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormRadioInputClassesUpdate,
    new FormRadioLabelClassesUpdate,
    new FormRadioClassesUpdate
  ).rule;
}

class FormRadioInputClassesUpdate implements IDomUpdate {
  selector = '.custom-radio.custom-control input.custom-control-input';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('custom-control-input')
      .addClass('form-check-input');
  }
}

class FormRadioLabelClassesUpdate implements IDomUpdate {
  selector = '.custom-radio.custom-control label.custom-control-label';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('custom-control-label')
      .addClass('form-check-label');
  }
}

class FormRadioClassesUpdate implements IDomUpdate {
  selector = '.custom-radio.custom-control';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const hasInlineClass = $element.hasClass('custom-control-inline');

        $element
          .removeClass('custom-radio custom-control')
          .addClass('form-check');

        if (hasInlineClass) {
          $element
            .removeClass('custom-control-inline')
            .addClass('form-check-inline');
        }
      });
  }
}
