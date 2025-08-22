type PackageTagProps = {
  meta: {
    tags: string[];
  };
};

export default function PackageTag({ meta }: PackageTagProps) {
  let packageName = '';
  let tagColor = '';

  if (meta.tags.includes('package:Styles')) {
    packageName = '@swisspost/design-system-styles';
    tagColor = '';
  } else if (meta.tags.includes('package:WebComponents')) {
    packageName = '@swisspost/design-system-components';
    tagColor = 'yellow';
  }

  return (
    <div className={`tag tag-sm mb-24 tag-${tagColor}`}>
      <div className="tag-text">{packageName}</div>
    </div>
  );
}
