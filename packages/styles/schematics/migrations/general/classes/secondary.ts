import { Rule } from '@angular-devkit/schematics';
import getDomMigrationRule from '../../../utils/dom/migration-rule';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return getDomMigrationRule(
    new SecondaryClassesUpdate
  );
}

class SecondaryClassesUpdate implements DomUpdate {
  selector = '.bg-secondary, .border-secondary, .text-secondary';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('bg-secondary border-secondary text-secondary');
  }
}
