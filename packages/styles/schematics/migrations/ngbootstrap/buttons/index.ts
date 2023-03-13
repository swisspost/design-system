import { Rule } from '@angular-devkit/schematics';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';
import { randomUUID } from 'crypto';
import getDomMigrationRule from '../../../utils/dom/migration-rule';
import DomUpdate from '../../../utils/dom/update';

export default function (): Rule {
  return getDomMigrationRule(
    new NgbButtonGroupDeprecationUpdate
  );
}

class NgbButtonGroupDeprecationUpdate implements DomUpdate {
  selector = '.btn-group';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        // get all buttons containing an input
        const $buttonGroup = $(element);
        const $labels = $buttonGroup
          .children('.btn')
          .filter(function() {
            return $(this).children('.btn-check').length === 1;
          });

        $labels.each((_j, label) => {
          const $label = $(label);
          const $input = $label.children('.btn-check').first();

          // remove ngb directive attributes
          $label.removeAttr('ngbButtonLabel');
          $input.removeAttr('ngbButton');

          // bind inputs with their label via an id
          let inputId = $input.attr('id');
          if (!inputId) {
            inputId = randomUUID();
            $input.attr('id', inputId);
          }
          $label.attr('for', inputId);

          // move entries right after their label
          $label.after($input);
        });
      });
  }
}
