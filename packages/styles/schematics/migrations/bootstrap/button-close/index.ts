import { Rule } from '@angular-devkit/schematics';
import getDomMigrationRule from '../../../utils/dom/migration-rule';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return getDomMigrationRule(
    new ButtonCloseClassesUpdate,
    new ButtonCloseRemoveIconContentUpdate
  );
}

class ButtonCloseClassesUpdate implements DomUpdate {
  selector = '.close';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $child = $element.find('> span[aria-hidden="true"]');

        if ($child.length > 0) {
          $element
            .removeClass('close btn btn-icon')
            .addClass('btn-close');
        }
      })
  }
}

class ButtonCloseRemoveIconContentUpdate implements DomUpdate {
  selector = '.btn-close';

  update ($elements: Cheerio<AnyNode>) {
    $elements
      .find('> span[aria-hidden="true"]')
      .remove();
  }
}
