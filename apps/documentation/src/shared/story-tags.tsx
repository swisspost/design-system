import { MetaComponent } from '@root/types';
import { PostTooltip, PostTooltipTrigger } from '@swisspost/design-system-components-react';

export default function StoryTags({ meta }: { meta: MetaComponent }) {
  const newTag = meta.tags.some(tag => tag === 'status:New') ? (
    <PostTooltipTrigger for="new-badge">
      <span className="tag tag-sm">🆕 New</span>
      <PostTooltip id="new-badge" placement="bottom">
        <p>
          This component has been added to the Design System recently. If you experience any bugs or
          want to give feedback, please{' '}
          <a href="https://github.com/swisspost/design-system/issues">open an issue on GitHub</a>.
        </p>
      </PostTooltip>
    </PostTooltipTrigger>
  ) : null;

  const tags = [newTag, meta.tags.filter(tag => tag.startsWith('package:')).map(getPackageTag)];

  return tags.length > 1 ? <div className="d-flex gap-8">{tags}</div> : tags;
}

function getPackageTag(tag: string) {
  let packageName: string = '';

  switch (tag) {
    case 'package:Styles':
      packageName = '@swisspost/design-system-styles';
      break;
    case 'package:WebComponents':
      packageName = '@swisspost/design-system-components';
      break;
  }

  return packageName ? (
    <p key={tag} className="tag tag-sm mt-0 mb-24">
      {packageName}
    </p>
  ) : null;
}
