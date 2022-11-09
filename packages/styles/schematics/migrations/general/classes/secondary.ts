import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new SecondaryClassesUpdate
  ).rule;
}

class SecondaryClassesUpdate implements IDomUpdate {
  selector = '.bg-secondary, .border-secondary, .text-secondary';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('bg-secondary border-secondary text-secondary');
  }
}
