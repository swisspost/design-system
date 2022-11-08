import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new CustomSelectFloatingLabelWrapperUpdate,
    new CustomSelectClassesUpdate,
    new CustomSelectMenuClassesUpdate
  ).rule;
}

class CustomSelectFloatingLabelWrapperUpdate implements IDomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $control = $element.find('> button.form-control-lg');
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

class CustomSelectClassesUpdate implements IDomUpdate {
  selector = 'button.form-control';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('form-control custom-select')
      .addClass('form-select');
  }
}

class CustomSelectMenuClassesUpdate implements IDomUpdate {
  selector = '.custom-select-menu';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('custom-select-menu')
      .addClass('w-100 mw-100');
  }
}
