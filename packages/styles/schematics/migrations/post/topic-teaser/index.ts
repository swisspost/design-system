import { Rule } from '@angular-devkit/schematics';
import DomMigration from '../../../utils/dom/migration';
import DomUpdate from '../../../utils/dom/update';
import type { Cheerio, AnyNode } from 'cheerio';

export default function (): Rule {
  return new DomMigration(
    new TopicTeaserImageWidthAndHeightUpdate,
    new TopicTeaserImageClassesUpdate,
    new TopicTeaserContentClassesUpdate,
    new TopicTeaserLinkListClassesUpdate
  ).rule;
}

class TopicTeaserImageWidthAndHeightUpdate implements DomUpdate {
  selector = '.topic-teaser-image';

  update ($elements: Cheerio<AnyNode>) {
    $elements
      .attr('width', '100%')
      .attr('height', '100%');
  }
}

class TopicTeaserImageClassesUpdate implements DomUpdate {
  selector = '.topic-teaser-image-container';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('col-10 col-rg-8 col-lg-4');
  }
}

class TopicTeaserContentClassesUpdate implements DomUpdate {
  selector = '.topic-teaser-content';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('col-12 col-lg-8');
  }
}

class TopicTeaserLinkListClassesUpdate implements DomUpdate {
  selector = '.topic-teaser ul.link-list';

  update ($elements: Cheerio<AnyNode>) {
    $elements.removeClass('font-curve-regular');
  }
}
