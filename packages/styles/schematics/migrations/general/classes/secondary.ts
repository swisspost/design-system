import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new SecondaryClassesUpdate
  ).rule;
}

class SecondaryClassesUpdate extends DomUpdate {
  selector = '.bg-secondary, .border-secondary, .text-secondary';

  update = function ($elements: Cheerio<any>) {
    $elements.removeClass('bg-secondary border-secondary text-secondary');
  }
}
