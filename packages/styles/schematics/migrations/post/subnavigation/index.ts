import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new SubnavigationInvertedClassUpdate
  ).rule;
}

class SubnavigationInvertedClassUpdate implements IDomUpdate {
  selector = '.subnavigation-inverted';

  update ($elements: Cheerio<any>) {
    $elements.removeClass('subnavigation-inverted');
  }
}
