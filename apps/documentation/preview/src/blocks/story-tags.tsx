import { PACKAGE_TAG_PREFIX, STATUS_TAG_PREFIX } from '@shared/tags';
import { packages } from '@preview/data/packages.data';
import { MetaComponent } from '@preview/types/storybook';
import {
  PostIcon,
  PostTooltip,
  PostTooltipTrigger,
} from '@swisspost/design-system-components-react';

export default function StoryTags({ meta }: { meta: MetaComponent }) {
  const newTag = meta.tags.includes(`${STATUS_TAG_PREFIX}new`) ? (
    <PostTooltipTrigger for="new-badge">
      <span className="tag tag-sm">
        <span aria-hidden>New</span>
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

  const tags = [newTag];

  for (const tag of meta.tags) {
    if (!tag.startsWith(PACKAGE_TAG_PREFIX)) continue;

    const id = tag.slice(PACKAGE_TAG_PREFIX.length);
    const data = packages[id];

    if (!data) continue;

    tags.push(
      <a
        key={id}
        href={data.links.docs.href}
        className="tag tag-sm mt-0 mb-24 text-decoration-none"
        aria-label={data.links.docs.ariaLabel}
      >
        <PostIcon name="parcel"></PostIcon>
        {data.npmName}
      </a>,
    );
  }

  return tags.length > 1 ? <div className="d-flex gap-8">{tags}</div> : tags;
}
