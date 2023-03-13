import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new SubnavigationInvertedClassUpdate
  ).rule;
}

class SubnavigationInvertedClassUpdate implements DomUpdate {
  selector = '.subnavigation-inverted';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('subnavigation-inverted');
  }
}
