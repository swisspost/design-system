import { Rule } from '@angular-devkit/schematics';
import getDomMigrationRule from '../../../utils/dom/migration-rule';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return getDomMigrationRule(
    new FormSwitchInputClassesUpdate,
    new FormSwitchLabelUpdate,
    new FormSwitchClassesUpdate
  );
}

class FormSwitchInputClassesUpdate implements DomUpdate {
  selector = '.switch input.switch';

  update ($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('switch')
      .addClass('form-check-input');
  }
}

class FormSwitchLabelUpdate implements DomUpdate {
  selector = '.switch';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $toggler = $element.find('label.switch-toggler');
        const $startLabel = $toggler.prev('label');
        const $endLabel = $toggler.next('label');

        $startLabel.addClass('form-check-label order-first');
        $endLabel.addClass('form-check-label');
        $toggler.remove();
      });
  }
}

class FormSwitchClassesUpdate implements DomUpdate {
  selector = '.switch';

  update ($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('switch')
      .addClass('form-check form-switch');
  }
}
