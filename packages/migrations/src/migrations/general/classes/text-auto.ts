import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new TextAutoClassUpdate,
  );
}

class TextAutoClassUpdate implements DomUpdate {
  selector = '.text-auto';

  update($elements: Cheerio<AnyNode>) {
    $elements.removeClass('text-auto');
  }
}
