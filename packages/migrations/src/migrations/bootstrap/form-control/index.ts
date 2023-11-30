import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new FormControlFloatingLabelWrapperUpdate,
  );
}

class FormControlFloatingLabelWrapperUpdate implements DomUpdate {
  selector = '.form-group';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $control = $element.find('> input.form-control-lg');
        const $label = $control.next('label');
        const isFloatingLabel = $control.length > 0 && $label.length > 0;

        if (isFloatingLabel) {
          $element
            .removeClass('form-group')
            .addClass('form-floating');

          $control.removeClass('form-control-lg');
        }
      });
  }
}
