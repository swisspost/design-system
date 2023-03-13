import { Rule } from '@angular-devkit/schematics';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return getDomMigrationRule(
    new TextAutoClassUpdate
  );
}

class TextAutoClassUpdate implements DomUpdate {
  selector = '.text-auto';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('text-auto');
  }
}
