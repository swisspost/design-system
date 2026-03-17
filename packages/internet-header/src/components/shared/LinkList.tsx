import { FunctionalComponent, h } from '@stencil/core';
import { LinkListConfig, LinkConfig } from '@/models/shared.model';
import { Link, LinkProps } from '@/components/shared';

interface LinkListPropsBase {
  config: LinkListConfig;
  listSlot?: string;
  linkProps?: LinkProps;
}

interface LinkListVisibleTitleProps extends LinkListPropsBase {
  hiddenTitle?: never;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  titleSlot?: string;
}

interface LinkListHiddenTitleProps extends LinkListPropsBase {
  hiddenTitle: LinkListConfig['title'] extends LinkConfig ? never : true;
  titleTag?: never;
  titleSlot?: never;
}

type LinkListProps = LinkListVisibleTitleProps | LinkListHiddenTitleProps;

export const LinkList: FunctionalComponent<LinkListProps> = (
  { config, ...props },
  customListItems,
) => {
  const titleContent = typeof config.title === 'string' ? config.title : config.title.text;

  const listItems = config.items
    .map(link => (
      <li>
        <Link {...props.linkProps} config={link} />
      </li>
    ))
    .concat(customListItems);

  const list =
    'hiddenTitle' in props ? (
      <ul slot={props.listSlot} aria-label={titleContent}>
        {listItems}
      </ul>
    ) : (
      <ul slot={props.listSlot} aria-labelledby={titleContent.toLowerCase().replaceAll(' ', '-')}>
        {listItems}
      </ul>
    );

  if ('hiddenTitle' in props) {
    return list;
  }

  const id = titleContent.toLowerCase().replaceAll(' ', '-');

  const TitleTag = props.titleTag ?? 'p';
  const titleElement =
    typeof config.title === 'string' ? (
      <TitleTag slot={props.titleSlot} id={id} innerHTML={titleContent} />
    ) : (
      <Link slot={props.titleSlot} id={id} config={config.title} />
    );

  return [titleElement, list];
};
