import React from 'react';

interface ITileProps {
  title?: string,
  href?: string,
  children: React.ReactNode
}

export function Tile (props: ITileProps) {
  const isLink = props.href !== undefined;
  const Tag = isLink ? 'a' : 'div';
  const attributes = isLink ? { href: props.href, target: '_blank', rel: 'noopener' } : null;

  return <Tag className="tile" {...attributes}>
    { props.title ? <span className="tile--title">{ props.title }</span> : null }
    <span className="tile--icon">
      { props.children }
    </span>
  </Tag>;
}
