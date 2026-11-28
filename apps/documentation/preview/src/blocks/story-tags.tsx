import { PACKAGE_TAG_PREFIX, STATUS_TAG_PREFIX } from '@shared/tags';
import { packages } from '@preview/data/packages.data';
import { MetaComponent } from '@preview/types/storybook';
import { PostTooltip, PostTooltipTrigger } from '@swisspost/design-system-components-react';

export default function StoryTags({ meta }: { meta: MetaComponent }) {
  const newTag = meta.tags.includes(`${STATUS_TAG_PREFIX}new`) ? (
    <PostTooltipTrigger for="new-badge">
      <span className="tag tag-sm">
        <span aria-hidden>🆕 New</span>
        <span className="visually-hidden">New component in v10</span>
      </span>
      <PostTooltip id="new-badge" placement="bottom">
        <p>
          This component has been added to the Design System recently. If you experience any bugs or
          want to give feedback, please{' '}
          <a href="https://github.com/swisspost/design-system/issues">open an issue on GitHub</a>.
        </p>
      </PostTooltip>
    </PostTooltipTrigger>
  ) : null;

  const packageTags = meta.tags
    .filter(tag => tag.startsWith(PACKAGE_TAG_PREFIX))
    .map(tag => tag.slice(PACKAGE_TAG_PREFIX.length))
    .filter(name => name in packages)
    .map(name => (
      <p key={name} className="tag tag-sm mt-0 mb-24">
        {packages[name].npmName}
      </p>
    ));

  const tags = [newTag, packageTags];

  return tags.length > 1 ? <div className="d-flex gap-8">{tags}</div> : tags;
}
