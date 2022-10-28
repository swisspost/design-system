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
 * This is the jQuery like selector which is used to find the element to be updated.
 * 
 * update: Function
 * This is the update function, which receives the cheerio-element as the first argument.
 * On a cheerio-element you can directly run jQuery like functions to mutate the element.
 * 
 * Note:
 * It is not possible to remove the selected element itself.
 * Instead you can select the parent element and then search the element to remove
 * and call the remove function on this element directly.
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
import DomUpdate from '../../utils/dom/update';
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

class AddElementUpdate extends DomUpdate {
  selector = '#example-dom-element';
  update = function ($element: Cheerio<any>) {
    $element.append('<div>It\'s working...</div><div class="remove-example"></div>');
  }
}

class AddClassUpdate extends DomUpdate {
  selector = '#example-dom-element > div:not([class])';
  update = function ($element: Cheerio<any>) {
    $element.addClass('inner');
  }
}

class AddAttributeUpdate extends DomUpdate {
  selector = '#example-dom-element .inner';
  update = function ($element: Cheerio<any>) {
    $element.attr('style', 'padding: 10px; background-color: white;');
  }
}

class AddTextUpdate extends DomUpdate {
  selector = '#example-dom-element .inner';
  update = function ($element: Cheerio<any>) {
    $element.text(`${$element.text()} cheerio!`);
  }
}

class RemoveElementUpdate extends DomUpdate {
  selector = '#example-dom-element';
  update = function ($element: Cheerio<any>) {
    $element.find('.remove-example').remove();
  }
}
