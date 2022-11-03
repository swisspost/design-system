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
 * On cheerio-elements you can directly run jQuery like functions to mutate the them.
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
import DomMigration from '../../utils/dom/migration';
import IDomUpdate from '../../utils/dom/update';
import type { Cheerio } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new AddElementUpdate,
    new AddClassUpdate,
    new AddAttributeUpdate,
    new AddTextUpdate,
    new RemoveElementUpdate
  ).rule;
}

class AddElementUpdate implements IDomUpdate {
  selector = '#example-dom-element';
  update = function ($elements: Cheerio<any>) {
    $elements.append('<div>It\'s working...</div><div class="remove-example"></div>');
  }
}

class AddClassUpdate implements IDomUpdate {
  selector = '#example-dom-element > div:not([class])';
  update = function ($elements: Cheerio<any>) {
    $elements.addClass('inner');
  }
}

class AddAttributeUpdate implements IDomUpdate {
  selector = '#example-dom-element .inner';
  update = function ($elements: Cheerio<any>) {
    $elements.attr('style', 'padding: 10px; background-color: white;');
  }
}

class AddTextUpdate implements IDomUpdate {
  selector = '#example-dom-element .inner';
  update = function ($elements: Cheerio<any>) {
    $elements.text(`${$elements.text()} cheerio!`);
  }
}

class RemoveElementUpdate implements IDomUpdate {
  selector = '#example-dom-element';
  update = function ($elements: Cheerio<any>) {
    $elements.find('.remove-example').remove();
  }
}
