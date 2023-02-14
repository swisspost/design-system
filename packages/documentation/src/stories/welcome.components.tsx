import React from 'react';

interface ITileProps {
  title?: string,
  href?: string,
  children: React.ReactNode
}

interface IBenefitProps {
  icon: string,
  title: string,
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

export function Benefit (props: IBenefitProps) {
  return <div className="benefit">
    <post-icon name={ props.icon } class="benefit--icon"></post-icon>
    <div className="benefit--content">
      <h3 className="content--title">{ props.title }</h3>
      { props.children }
    </div>
  </div>;
}
