import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new SecondaryClassesUpdate,
  );
}

class SecondaryClassesUpdate implements DomUpdate {
  selector = '.bg-secondary, .border-secondary, .text-secondary';

  update($elements: Cheerio<AnyNode>) {
    $elements.removeClass('bg-secondary border-secondary text-secondary');
  }
}
