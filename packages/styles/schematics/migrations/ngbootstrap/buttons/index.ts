import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new ButtonGroupClassUpdate,
    new ButtonLabelClassUpdate,
    new ButtonInputClassUpdate
  ).rule;
}

class ButtonGroupClassUpdate implements IDomUpdate {
  selector = '.btn-group.btn-group-toggle';
  
  update ($elements: Cheerio<any>) {
    $elements.removeClass('btn-group-toggle');
  }
}

class ButtonLabelClassUpdate implements IDomUpdate {
  selector = '.btn-group label.btn-primary[ngbButtonLabel]';

  update ($elements: Cheerio<any>) {
    $elements
      .removeClass('btn-primary')
      .addClass('btn btn-secondary');
  }
}

class ButtonInputClassUpdate implements IDomUpdate {
  selector = '.btn-group input[ngbButton]';
  
  update ($elements: Cheerio<any>) {
    $elements.addClass('btn-check');
  }
}
