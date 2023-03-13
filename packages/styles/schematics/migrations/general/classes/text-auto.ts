import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new TextAutoClassUpdate
  ).rule;
}

class TextAutoClassUpdate implements DomUpdate {
  selector = '.text-auto';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('text-auto');
  }
}
