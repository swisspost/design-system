import { MetaComponent } from '@root/types';

export default function PackageTag({ meta }: { meta: MetaComponent }) {
  const tags = meta.tags.filter(tag => tag.startsWith('package:')).map(getTag);
  return tags.length > 1 ? <div className="d-flex gap-8">{tags}</div> : tags;
}

function getTag(tag: string) {
  let packageName: string = '';

  switch (tag) {
    case 'package:Styles':
      packageName = '@swisspost/design-system-styles';
      break;
    case 'package:WebComponents':
      packageName = '@swisspost/design-system-components';
      break;
  }

  return packageName ? <p className="tag tag-sm mt-0 mb-24">{packageName}</p> : null;
}
