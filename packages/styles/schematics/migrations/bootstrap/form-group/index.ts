import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormGroupClassUpdate,
    new FormTextClassUpdate
  ).rule;
}

class FormGroupClassUpdate implements IDomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      // @ts-ignore
      .each((i, element) => {
        const $element = $(element);
        const isFloatingLabelGroup = $element.find('input.form-control.form-control-lg').length > 0;

        if (!isFloatingLabelGroup) {
          $element
            .removeClass('form-group')
            .addClass('mb-regular');
        }
      })
  }
}

class FormTextClassUpdate implements IDomUpdate {
  selector = '.form-text';

  update ($elements: Cheerio<any>) {
    $elements.removeClass('small text-muted');
  }
}
