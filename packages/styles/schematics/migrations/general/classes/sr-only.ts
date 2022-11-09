import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new SrOnlyClassUpdate,
    new SrOnlyFocusableClassUpdate
  ).rule;
}

class SrOnlyClassUpdate implements IDomUpdate {
  selector = '.sr-only';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('sr-only')
      .addClass('visually-hidden');
    }
  }
  
  class SrOnlyFocusableClassUpdate implements IDomUpdate {
    selector = '.sr-only-focusable';
    
    update ($elements: Cheerio<any>) {
      $elements
        .removeClass('sr-only-focusable')
        .addClass('visually-hidden-focusable');
  }
}
