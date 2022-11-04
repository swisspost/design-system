import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new TextareaFloatingLabelWrapperUpdate
  ).rule;
}

class TextareaFloatingLabelWrapperUpdate implements IDomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $control = $element.find('> textarea');
        const $label = $element.next('label');
        const $description = $control.siblings(`[for="${$control.attr('id')}"]`);

        const labelText = $label.text() || $description.text();

        const setLabel = $label.length === 0 && $description.length > 0;
        const setPlaceholder = $description.length > 0 && $control.attr('placeholder') === undefined;
        const isFloatingLabel = $control.length > 0;
        
        if (isFloatingLabel) {
          $element
            .removeClass('form-group')
            .addClass('form-floating');

          if (setLabel) {
            $(`<label for="${$control.attr('id')}">${labelText}</label>`).insertAfter($control);
            $description.remove();
          }

          if (setPlaceholder) {
            $control.attr('placeholder', labelText);
          }
        }
      });
  }
}
