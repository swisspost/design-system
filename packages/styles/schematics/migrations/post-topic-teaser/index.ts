import { Rule } from '@angular-devkit/schematics';
import { CssClassesUpdate } from '../../utils/css/css-classes-update';
import { CssMigration } from '../../utils/css/css-migration';
import { oneOf } from '../../utils/regex';

export default function (): Rule {
    return new CssMigration(
        new TopicTeaserImageContainerClassesUpdate,
        new TopicTeaserContentClassesUpdate,
        new TopicTeaserLinkListClassesUpdate
    ).rule;
}

class TopicTeaserImageContainerClassesUpdate extends CssClassesUpdate {
    override classSelector = 'topic-teaser-image-container';
    searchValue = oneOf(['col-10', 'col-rg-8', 'col-lg-4']);
    replaceValue = '';
}

class TopicTeaserContentClassesUpdate extends CssClassesUpdate {
    override classSelector = 'topic-teaser-content';
    searchValue = oneOf(['col-12', 'col-lg-8']);
    replaceValue = '';
}

class TopicTeaserLinkListClassesUpdate extends CssClassesUpdate {
    override tagSelector = 'ul';
    override classSelector = 'link-list';
    searchValue = 'font-curve-regular';
    replaceValue = '';
}
