import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new BlockquotePClassUpdate
  ).rule;
}

// TODO: Refactored blockquote with footer. Such blockquotes now need to be nested in a figure tag. In addition, the tag footer.blockquote-footer became figcaption.blockquote-footer.

class BlockquotePClassUpdate implements IDomUpdate {
  selector = 'blockquote.blockquote > p.mb-0';

  update ($elements: Cheerio<any>) {
    $elements.removeClass('mb-0');
  }
}