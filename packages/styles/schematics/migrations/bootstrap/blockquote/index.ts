import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import IDomUpdate from '../../../utils/dom/update';
import { Cheerio, AnyNode, CheerioAPI } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new BlockquoteFigureWrapperUpdate,
    new BlockquotePClassUpdate
  ).rule;
}

class BlockquoteFigureWrapperUpdate implements IDomUpdate {
  selector = 'blockquote.blockquote';

  update ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        const $footer = $element.find('footer.blockquote-footer');
        const hasFooter = $footer.length > 0;

        if (hasFooter) {
          const $wrapper = $('<figure/>').data($element.data());
          const $replacer = $(`<figcaption>${$footer.prop('innerHTML')}</figcaption>`);

          $footer
            .prop('attributes')
            .forEach(({ name, value }) => {
              $replacer.attr(name, value);
            });

          $footer.replaceWith($replacer);
          $element.wrap($wrapper);
        }
      });
  }
}

class BlockquotePClassUpdate implements IDomUpdate {
  selector = 'blockquote.blockquote > p.mb-0';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('mb-0');
  }
}