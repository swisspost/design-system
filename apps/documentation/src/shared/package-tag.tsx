import { MetaComponent } from '@root/types';

type PackageTagProps = {
  meta: MetaComponent;
};

export default function PackageTag({ meta }: PackageTagProps) {
  let packageName = '';
  let tagColor = '';

  if (meta.tags.includes('package:Styles')) {
    packageName = '@swisspost/design-system-styles';
  } else if (meta.tags.includes('package:WebComponents')) {
    packageName = '@swisspost/design-system-components';
    tagColor = 'yellow';
  }

  const tagClass = 'tag tag-sm mb-24' + (tagColor ? ' tag-' + tagColor : '');
  return (
    <div className={tagClass}>
      <div className="tag-text">{packageName}</div>
    </div>
  );
}
