import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormSwitchInputClassesUpdate,
    new FormSwitchLabelUpdate,
    new FormSwitchClassesUpdate
  ).rule;
}

class FormSwitchInputClassesUpdate implements IDomUpdate {
  selector = '.switch input.switch';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('switch')
      .addClass('form-check-input');
  }
}

class FormSwitchLabelUpdate implements IDomUpdate {
  selector = '.switch';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
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

class FormSwitchClassesUpdate implements IDomUpdate {
  selector = '.switch';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('switch')
      .addClass('form-check form-switch');
  }
}
