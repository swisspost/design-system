import { Rule } from '@angular-devkit/schematics';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return getDomMigrationRule(
    new SrOnlyClassUpdate,
    new SrOnlyFocusableClassUpdate
  );
}

class SrOnlyClassUpdate implements DomUpdate {
  selector = '.sr-only';

  update ($elements: Cheerio<AnyNode>) {
    $elements
      .removeClass('sr-only')
      .addClass('visually-hidden');
    }
  }

  class SrOnlyFocusableClassUpdate implements DomUpdate {
    selector = '.sr-only-focusable';

    update ($elements: Cheerio<AnyNode>) {
      $elements
        .removeClass('sr-only-focusable')
        .addClass('visually-hidden-focusable');
  }
}
