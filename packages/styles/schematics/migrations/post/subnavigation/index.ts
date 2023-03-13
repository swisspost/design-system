import { Rule } from '@angular-devkit/schematics';
import getDomMigrationRule from '../../../utils/dom/migration-rule';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return getDomMigrationRule(
    new SubnavigationInvertedClassUpdate
  );
}

class SubnavigationInvertedClassUpdate implements DomUpdate {
  selector = '.subnavigation-inverted';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('subnavigation-inverted');
  }
}
