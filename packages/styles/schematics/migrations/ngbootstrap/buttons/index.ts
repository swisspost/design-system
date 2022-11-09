import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new ButtonGroupClassUpdate,
    new ButtonLabelClassUpdate,
    new ButtonInputClassUpdate
  ).rule;
}

class ButtonGroupClassUpdate implements IDomUpdate {
  selector = '.btn-group.btn-group-toggle';
  
  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('btn-group-toggle');
  }
}

class ButtonLabelClassUpdate implements IDomUpdate {
  selector = '.btn-group label.btn-primary';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const isNgbButtonLabel = $element.attr('ngbButtonLabel') !== undefined;

        if (isNgbButtonLabel) {
          $element
            .removeClass('btn-primary')
            .addClass('btn btn-secondary');
        }
      });
  }
}

class ButtonInputClassUpdate implements IDomUpdate {
  selector = '.btn-group input[ngbButton]';
  
  update ($elements: Cheerio<AnyNode>) {
    $elements.addClass('btn-check');
  }
}
