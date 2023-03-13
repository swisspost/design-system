import { Rule } from '@angular-devkit/schematics';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';
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
