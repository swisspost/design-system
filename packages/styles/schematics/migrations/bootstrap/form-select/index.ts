import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormSelectFloatingLabelWrapperUpdate
  ).rule;
}

class FormSelectFloatingLabelWrapperUpdate implements IDomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $control = $element.find('> select.form-control-lg');
        const $label = $control.next('label');
        const isFloatingLabel = $control.length > 0 && $label.length > 0;
        
        if (isFloatingLabel) {
          $element
            .removeClass('form-group')
            .addClass('form-floating');

          $control.removeClass('.form-control-lg');
        }
      });
  }
}
