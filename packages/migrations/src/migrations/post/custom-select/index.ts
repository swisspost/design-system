import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new CustomSelectFloatingLabelWrapperUpdate(),
    new CustomSelectClassesUpdate(),
    new CustomSelectMenuClassesUpdate(),
  );
}

class CustomSelectFloatingLabelWrapperUpdate implements DomUpdate {
  selector = '.form-group';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);
      const $control = $element.find('> button.form-control-lg');
      const $label = $control.next('label');
      const isNgbDropdown = $element.attr('ngbDropdown') !== undefined;
      const isFloatingLabel = $control.length > 0 && $label.length > 0;

      if (isNgbDropdown && isFloatingLabel) {
        $element.removeClass('form-group').addClass('form-floating');

        $control.removeClass('form-control-lg');
      }
    });
  }
}

class CustomSelectClassesUpdate implements DomUpdate {
  selector = 'button.form-control';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);
      const isNgbDropdownToggle = $element.attr('ngbDropdownToggle') !== undefined;

      if (isNgbDropdownToggle) {
        $element.removeClass('form-control custom-select').addClass('form-select');
      }
    });
  }
}

class CustomSelectMenuClassesUpdate implements DomUpdate {
  selector = '.custom-select-menu';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements.each((_i, element) => {
      const $element = $(element);
      const isNgbDropdownMenu = $element.attr('ngbDropdownMenu') !== undefined;

      if (isNgbDropdownMenu) {
        $element.removeClass('custom-select-menu').addClass('w-100 min-w-100');
      }
    });
  }
}
