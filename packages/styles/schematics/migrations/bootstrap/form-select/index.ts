import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

import { breakpoints } from "../../../utils/constants";

export default function (): Rule {
  return new DomMigration(
    new FormSelectFloatingLabelWrapperUpdate,
    new FormSelectCustomClassesUpdate
  ).rule;
}

class FormSelectFloatingLabelWrapperUpdate implements IDomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
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

          $control.removeClass('form-control-lg');
        }
      });
  }
}

class FormSelectCustomClassesUpdate implements IDomUpdate {
  cssClassRegex: RegExp = new RegExp(`^form-control-(${breakpoints.join('|')})$`);
  selector = 'select.form-control';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);

        $element
          .removeClass('form-control custom-select')
          .addClass('form-select')
          .attr('class')
          ?.split(' ')
          .forEach(cssClass => {
            const match = cssClass.match(this.cssClassRegex);
                
            if (match) {
              const breakpoint = match[1];
              
              $element
                .removeClass(cssClass)
                .addClass(`form-select-${breakpoint}`);
            }
          });
      });
  }
}
