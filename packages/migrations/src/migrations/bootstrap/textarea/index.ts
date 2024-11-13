import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new TextareaFloatingLabelWrapperUpdate,
  );
}

class TextareaFloatingLabelWrapperUpdate implements DomUpdate {
  selector = '.form-group';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
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
            $(`<label class="form-label" for="${$control.attr('id')}">${labelText}</label>`).insertAfter($control);
            $description.remove();
          }

          if (setPlaceholder) {
            $control.attr('placeholder', labelText);
          }
        }
      });
  }
}
