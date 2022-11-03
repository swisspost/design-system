import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new ButtonCloseClassesUpdate,
    new ButtonCloseRemoveIconContentUpdate
  ).rule;
}

class ButtonCloseClassesUpdate implements IDomUpdate {
  selector = '.close';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('close btn btn-icon')
      .addClass('btn-close');
  }
}

class ButtonCloseRemoveIconContentUpdate implements IDomUpdate {
  selector = '.btn-close';

  update ($elements: Cheerio<any>, $: CheerioAPI) {
    $elements
      .find('> span[aria-hidden="true"]')
      // @ts-ignore
      .filter((i, element) => Object.keys($(element).attr()).length === 1)
      .remove();
  }
}