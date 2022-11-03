import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new ButtonCloseClassesUpdate,
    new ButtonCloseRemoveIconContentUpdate
  ).rule;
}

class ButtonCloseClassesUpdate extends DomUpdate {
  selector = '.close';

  update = function ($elements: Cheerio<any>) {
    $elements
      .removeClass('close btn btn-icon')
      .addClass('btn-close');
  }
}

class ButtonCloseRemoveIconContentUpdate extends DomUpdate {
  selector = '.btn-close';

  update = function ($elements: Cheerio<any>, $: any) {
    $elements
      .find('> span[aria-hidden="true"]')
      // @ts-ignore
      .filter((i, element) => Object.keys($(element).attr()).length === 1)
      .remove();
  }
}