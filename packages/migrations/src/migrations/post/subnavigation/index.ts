import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new SubnavigationInvertedClassUpdate,
  );
}

class SubnavigationInvertedClassUpdate implements DomUpdate {
  selector = '.subnavigation-inverted';

  update($elements: Cheerio<AnyNode>) {
    $elements.removeClass('subnavigation-inverted');
  }
}
