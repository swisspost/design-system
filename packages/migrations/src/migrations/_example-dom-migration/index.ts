/*
 * This is a dom-migration example
 *
 * You can write more than just one update in a migration schematic
 * by defining multiple DomUpdates and pass them all to the DomMigration Class.
 *
 * Important note:
 * The order of the DomUpdates is important, because updates are additive.
 * This means, every update you register will receive the updated DOM from
 * the previous update, and can now make it's own changes.
 *
 * We use cheerio thogether with htmlparser2 under the hood which makes it possible
 * to write updates by defining only two simple parameters:
 *
 * selector: string
 * This is the jQuery like selector which is used to find the elements to be updated.
 *
 * update: Function
 * This is the update function, which receives the cheerio-element as the first argument
 * and the cheerio-instance as the second.
 * On cheerio-elements you can directly run jQuery like functions to mutate them.
 * The cheerio-instance is sometimes helpfull, for example to convert elements in loops
 * into a new cheerio-element:
 * $elements.filter((i, element) => $(element).hasClass('bla')).addClass('bla-2');
 *
 * Note:
 * It is not possible to remove the selected elements itself.
 * Instead you can select the parent elements and then search the elements to remove
 * and call the remove function on this elements directly.
 * See RemoveElementUpdate example.
 *
 * To try this example, you must add it as a schematic in your collection.json file
 * and you need to add the following code somewhere in your html that should get updated:
 *
 * <div id="example-dom-element"></div>
 *
 */

import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new AddElementUpdate,
    new AddClassUpdate,
    new AddAttributeUpdate,
    new AddTextUpdate,
    new RemoveElementUpdate,
    new WrapElementUpdate,
    new ReplaceWithElementUpdate,
  );
}

class AddElementUpdate implements DomUpdate {
  selector = '.example-dom-element';
  update = function ($elements: Cheerio<AnyNode>) {
    $elements.append('<span>It\'s working...</span>');
  };
}

class AddClassUpdate implements DomUpdate {
  selector = '.example-dom-element';
  update = function ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((i, element) => {
        if (i === 1) {
          $(element).addClass('remove');
        }
        if (i === 2) {
          $(element).addClass('wrap');
        }
        if (i === 3) {
          $(element).addClass('replace-with');
        }
      });
  };
}

class AddAttributeUpdate implements DomUpdate {
  selector = '.example-dom-element > span';
  update = function ($elements: Cheerio<AnyNode>) {
    $elements.attr('style', 'padding: 10px; background-color: white;');
  };
}

class AddTextUpdate implements DomUpdate {
  selector = '.example-dom-element > span';
  update = function ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);

        $element.text(`${$element.text()} cheerio!`);
      });
  };
}

class RemoveElementUpdate implements DomUpdate {
  selector = '.example-dom-element.remove';
  update = function ($elements: Cheerio<AnyNode>) {
    $elements.remove();
  };
}

class WrapElementUpdate implements DomUpdate {
  selector = '.example-dom-element.wrap';
  update = function ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        // to let the update work correctly you need to copy the data from the sourceElement to the distElement
        // how to do this depends on the return value of the migration function used on the sourceElement
        const $wrapper = $('<div class="example-dom-element-wrapper"></div>').data($element.data());

        $element.wrap($wrapper);
      });
  };
}

class ReplaceWithElementUpdate implements DomUpdate {
  selector = '.example-dom-element.replace-with';
  update = function ($elements: Cheerio<AnyNode>, $: CheerioAPI) {
    $elements
      .each((_i, element) => {
        const $element = $(element);
        // to let the update work correctly you need to copy the data from the sourceElement to the distElement
        // how to do this depends on the return value of the migration function used on the sourceElement
        const $replacement = $(`<div class="example-dom-element-wrapper">${$element.prop('outerHTML')}</div>`)
          .data($element.data());

        $element.replaceWith($replacement);
      });
  }
}
