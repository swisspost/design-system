import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new FormGroupClassUpdate,
    new FormTextClassUpdate
  ).rule;
}

class FormGroupClassUpdate implements IDomUpdate {
  selector = '.form-group';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('form-group')
      .addClass('mb-regular');
  }
}

class FormTextClassUpdate implements IDomUpdate {
  selector = '.form-text';

  update ($elements: Cheerio<any>) {
    $elements.removeClass('small text-muted');
  }
}
