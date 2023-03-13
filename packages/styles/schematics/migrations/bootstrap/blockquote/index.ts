import { Rule } from '@angular-devkit/schematics';
import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new BlockquoteFigureWrapperUpdate,
    new BlockquotePClassUpdate,
  );
}

class BlockquoteFigureWrapperUpdate implements DomUpdate {
  selector = 'blockquote.blockquote';

  update($elements: Cheerio<AnyNode>, $: CheerioAPI) {
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

class BlockquotePClassUpdate implements DomUpdate {
  selector = 'blockquote.blockquote > p.mb-0';

  update($elements: Cheerio<AnyNode>) {
    $elements.removeClass('mb-0');
  }
}
