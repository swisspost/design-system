import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormControlLabelClassUpdate,
    new FormControlFloatingLabelWrapperUpdate
  ).rule;
}

class FormControlLabelClassUpdate implements IDomUpdate {
  selector = 'input.form-control + label';

  update ($elements: Cheerio<any>) {
    $elements.addClass('form-label');
  }
}

class FormControlFloatingLabelWrapperUpdate implements IDomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      // @ts-ignore
      .each((i, element) => {
        const $element = $(element);
        const $input = $element.find('input.form-control.form-control-lg');
        const isFloatingLabelGroup = $input.length > 0;

        if (isFloatingLabelGroup) {
          $element
            .removeClass('form-group')
            .addClass('form-floating');

          $input.removeClass('form-control-lg');
        }
      });
  }
}
